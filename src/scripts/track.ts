/**
 * GA4/GTM conversion events.
 *
 * GTM is injected by BaseLayout after idle (~3.5s); pushes made before the
 * container boots queue in the dataLayer array and are replayed when it
 * loads, so calling track() is always safe.
 */
type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: TrackParams = {}): void {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * Delegated click tracking for links that exist all over the site:
 * WhatsApp, email, partner-platform logos, and any element carrying an
 * explicit data-track="event_name" attribute.
 */
export function initClickTracking(): void {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('a, button') as HTMLElement | null;
      if (!el) return;

      const explicit = el.getAttribute('data-track');
      if (explicit) {
        track(explicit, { path: location.pathname });
        return;
      }

      const href = el.getAttribute('href') || '';
      if (href.includes('wa.me')) {
        track('contact_whatsapp', { path: location.pathname });
      } else if (href.startsWith('mailto:')) {
        track('contact_email', { path: location.pathname });
      } else if (el.closest('.qbook__partner, .qbc__partner, .qfeatured__partner')) {
        track('click_partner', {
          partner: el.getAttribute('aria-label') || 'unknown',
          path: location.pathname,
        });
      }
    },
    { capture: true }
  );
}
