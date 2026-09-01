/**
 * WhatsApp deep links with a prefilled message.
 *
 * A blank wa.me chat is a real friction point — visitors land on an empty
 * input and many stall. Prefilling a contextual first line ("I'd like to
 * book the Left Bank tour…") makes sending effortless. Messages come from
 * the i18n layer (quiet.wa.*) so EN/FR pages prefill in the right language.
 */
export const WHATSAPP_NUMBER = '33620622480';

export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
