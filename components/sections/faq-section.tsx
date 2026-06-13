import { Reveal } from '@/components/motion/reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS } from '@/content/faqs';

export function FaqSection() {
  return (
    <section className="surface-parchment section-pad">
      <div className="container-page">
        <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-4 text-[var(--color-ink)]">
              Things you might be
              <span className="display-italic block text-[var(--color-midnight)]">
                wondering quietly.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[var(--color-muted)]">
              If your question isn&rsquo;t here, write to us. We answer everything we receive,
              usually within a day.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
