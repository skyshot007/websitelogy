export interface Step {
  number: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS: Step[] = [
  {
    number: '01',
    title: 'Choose your session',
    description:
      'Pick from a focused consultation, a hand-prepared kundli, or one of our deeper services. Each one is built for a different kind of question.',
  },
  {
    number: '02',
    title: 'Share your birth details',
    description:
      'Date, time, and place of birth \u2014 with as much accuracy as you can. We open with a brief intention so the session goes where you actually need it to.',
  },
  {
    number: '03',
    title: 'Receive your guidance',
    description:
      'A private video session, a written follow-up, and continued support over chat for the questions that arrive after. Quietly companioned, not abandoned.',
  },
];
