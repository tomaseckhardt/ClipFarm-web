// Ilustrační stream „nocni_smena“ (3:00:00) pro časovou osu a tabulku limitů. Data jsou smyšlená.
// [minuta, skóre, délka klipu v s] – momenty jsou víc než 2 min od sebe, klipy 20–60 s (pravidla z README).
export const DEMO_PEAKS: [number, number, number][] = [
  [14, 3.2, 41], [31, 1.8, 27], [47, 6.4, 34], [63, 2.6, 38], [78, 2.1, 22], [96, 4.7, 27],
  [112, 1.6, 31], [125, 3.9, 45], [141, 2.8, 29], [158, 5.1, 41], [171, 2.3, 36],
];
export const DEMO_MINUTES = 180;
export const DEFAULT_LIMIT = 2.5;
