// Lightweight, SSR-safe wrapper around Google Analytics 4 (gtag.js).
// No-ops gracefully if gtag isn't available (e.g. blocked, not loaded yet).

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: string, params?: GtagParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}
