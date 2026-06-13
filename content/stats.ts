export interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export const STATS: Stat[] = [
  { value: 22, suffix: '+', label: 'Years', sub: 'of personal practice' },
  { value: 18000, suffix: '+', label: 'Consultations', sub: 'honoured & guided' },
  { value: 42, suffix: '', label: 'Countries', sub: 'served, in two languages' },
  { value: 9, suffix: '+', label: 'Awards', sub: 'and academic recognitions' },
];
