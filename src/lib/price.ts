/** Locale-aware euro formatting: EN "€59" · FR "59 €". */
export function formatEUR(lang: string, amount: string | number): string {
  return lang === 'fr' ? `${amount} €` : `€${amount}`;
}
