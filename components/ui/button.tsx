import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-midnight)] text-[var(--color-cream)] hover:bg-[var(--color-astral)] hover:shadow-[0_8px_30px_-12px_rgba(201,165,92,0.45)]',
        gold:
          'bg-gradient-gold text-[var(--color-midnight)] shadow-gold hover:brightness-105 hover:-translate-y-0.5',
        outline:
          'border border-[var(--color-gold)]/70 bg-transparent text-current hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)]',
        outlineLight:
          'border border-[var(--color-cream)]/40 bg-transparent text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 hover:border-[var(--color-cream)]/80',
        ghost:
          'bg-transparent text-current hover:bg-[var(--color-ink)]/5',
        link:
          'bg-transparent text-current underline-offset-4 hover:underline decoration-[var(--color-gold)] decoration-1',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-[15px] rounded-full',
        lg: 'h-12 min-h-12 px-8 text-base rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
