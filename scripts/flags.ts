#!/usr/bin/env tsx
/**
 * Feature flag CLI.
 *
 *   pnpm flags:hash                    -> print TRUE_HASH and FALSE_HASH for the current salt
 *   pnpm flags:init                    -> rewrite every flag in config/feature-flags.json to FALSE_HASH
 *   pnpm flags:list                    -> show decoded state of every flag (blocked in production)
 *   pnpm flags:set <name> <true|false> -> set one flag's value to the matching hash
 *
 * The salt is read from process.env.FLAG_SALT, falling back to 'anil_astro+1115'.
 */

import crypto from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FLAGS_FILE = resolve(process.cwd(), 'config/feature-flags.json');
const DEFAULT_SALT = 'anil_astro+1115';
const SALT = process.env.FLAG_SALT ?? DEFAULT_SALT;

const md5 = (s: string) => crypto.createHash('md5').update(s).digest('hex');
const TRUE_HASH = md5(`true+${SALT}`);
const FALSE_HASH = md5(`false+${SALT}`);

type FlagsFile = Record<string, string>;

function readFlags(): FlagsFile {
  const raw = readFileSync(FLAGS_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeFlags(data: FlagsFile): void {
  const text = JSON.stringify(data, null, 2) + '\n';
  writeFileSync(FLAGS_FILE, text, 'utf8');
}

function flagKeys(data: FlagsFile): string[] {
  return Object.keys(data).filter((k) => !k.startsWith('$'));
}

function decode(hash: string): 'true' | 'false' | 'unknown' {
  if (hash === TRUE_HASH) return 'true';
  if (hash === FALSE_HASH) return 'false';
  return 'unknown';
}

function cmdHash(): void {
  console.log('Feature flag salt: ' + SALT);
  console.log('TRUE_HASH  = ' + TRUE_HASH);
  console.log('FALSE_HASH = ' + FALSE_HASH);
  console.log('');
  console.log("To enable a flag manually, paste TRUE_HASH as that flag's value in config/feature-flags.json.");
  console.log('Or use: pnpm flags:set <name> true');
}

function cmdInit(): void {
  const data = readFlags();
  let count = 0;
  for (const key of flagKeys(data)) {
    data[key] = FALSE_HASH;
    count += 1;
  }
  writeFlags(data);
  console.log('Initialised ' + count + ' flag(s) to FALSE_HASH for salt "' + SALT + '".');
}

function cmdList(): void {
  if (process.env.NODE_ENV === 'production') {
    console.error('flags:list is blocked in production. Read config/feature-flags.json directly.');
    process.exit(1);
  }
  const data = readFlags();
  const keys = flagKeys(data).sort();
  const padding = Math.max(...keys.map((k) => k.length));
  console.log('Flag'.padEnd(padding) + '  State');
  console.log('-'.repeat(padding) + '  -----');
  for (const key of keys) {
    const state = decode(data[key]);
    const label = state === 'true' ? 'ON' : state === 'false' ? 'off' : 'UNKNOWN';
    console.log(key.padEnd(padding) + '  ' + label);
  }
}

function cmdSet(args: string[]): void {
  const [name, value] = args;
  if (!name || (value !== 'true' && value !== 'false')) {
    console.error('Usage: pnpm flags:set <name> <true|false>');
    process.exit(1);
  }
  const data = readFlags();
  if (!(name in data) || name.startsWith('$')) {
    console.error('Unknown flag: ' + name);
    console.error('Available flags:');
    for (const key of flagKeys(data)) console.error('  ' + key);
    process.exit(1);
  }
  data[name] = value === 'true' ? TRUE_HASH : FALSE_HASH;
  writeFlags(data);
  console.log(name + ' -> ' + value);
}

const [, , subcommand, ...rest] = process.argv;

switch (subcommand) {
  case 'hash':
    cmdHash();
    break;
  case 'init':
    cmdInit();
    break;
  case 'list':
    cmdList();
    break;
  case 'set':
    cmdSet(rest);
    break;
  default:
    console.error('Usage: pnpm flags:<hash|init|list|set>');
    process.exit(1);
}
