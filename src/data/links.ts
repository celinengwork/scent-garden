/**
 * External links — fill these in before deploying.
 * An empty string renders as a harmless placeholder link (href="#", marked data-todo).
 */
export const links = {
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
  instagram: '', // e.g. 'https://www.instagram.com/your-handle'
  email: '', // e.g. 'hello@example.com' (without "mailto:")
  vecWebsite: '', // "Visit the website" in the VEC Website case study
  vecLandingPage: '', // "Visit landing page" in the VEC Website case study
  wildflowersMore: '', // "See more" under Wildflowers (Kelsie Beauty Clues)
  /** "Watch →" links for the C-Level Interview Series, in guest order (01–14). */
  interviewGuests: Array.from({ length: 14 }, () => ''),
};

/** Attributes for an outbound link; falls back to a placeholder while the URL is empty. */
export function external(url: string) {
  return url
    ? { href: url, target: '_blank', rel: 'noopener' }
    : { href: '#', 'data-todo': 'add-link' };
}

export function mailto(address: string) {
  return address ? { href: `mailto:${address}` } : { href: '#', 'data-todo': 'add-email' };
}
