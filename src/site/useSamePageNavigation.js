import { useEffect } from 'react';

// Same-page anchor links (including "/#features" while already on "/") scroll smoothly,
// respect prefers-reduced-motion, honour the sticky header via CSS scroll-margin, and leave
// the address bar clean afterwards. Skip links opt out so the browser can move keyboard focus.

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearLocationHash() {
  if (!window.location.hash) return;
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`);
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return false;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  clearLocationHash();
  return true;
}

function sectionIdFromAnchor(anchor) {
  if (anchor.hasAttribute('data-native-hash')) return '';
  const raw = anchor.getAttribute('href');
  if (!raw || raw === '#') return '';
  let url;
  try {
    url = new URL(raw, window.location.href);
  } catch {
    return '';
  }
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return '';
  const id = decodeURIComponent(url.hash.slice(1));
  return id && document.getElementById(id) ? id : '';
}

function onClick(event) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!anchor) return;
  const sectionId = sectionIdFromAnchor(anchor);
  if (!sectionId) return;
  event.preventDefault();
  scrollToSection(sectionId);
}

export function useSamePageNavigation() {
  useEffect(() => {
    document.addEventListener('click', onClick);

    let frameId = 0;
    if (window.location.hash.length > 1) {
      const sectionId = decodeURIComponent(window.location.hash.slice(1));
      frameId = window.requestAnimationFrame(() => {
        if (!scrollToSection(sectionId)) clearLocationHash();
      });
    }

    return () => {
      document.removeEventListener('click', onClick);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);
}
