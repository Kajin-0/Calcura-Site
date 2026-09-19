import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isConnected = (element) => Boolean(element && element.isConnected);

export function useDownloadChooserLifecycle({ open, setOpen, rootRef, triggerRef }) {
  const restoreFocusRef = useRef(true);

  const closeChooser = useCallback(
    ({ restoreFocus = true } = {}) => {
      restoreFocusRef.current = restoreFocus;
      setOpen(false);
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return undefined;

    restoreFocusRef.current = true;
    const panel = rootRef.current?.querySelector('[role="dialog"]');
    const focusables = () => Array.from(panel?.querySelectorAll(FOCUSABLE_SELECTOR) || []);
    const first = focusables()[0];
    first?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeChooser();
        return;
      }
      if (event.key !== 'Tab') return;
      const current = focusables();
      if (current.length === 0) {
        event.preventDefault();
        return;
      }
      const firstFocusable = current[0];
      const lastFocusable = current[current.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) closeChooser();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      if (restoreFocusRef.current && isConnected(triggerRef.current)) {
        triggerRef.current.focus();
      }
    };
  }, [closeChooser, open, rootRef, triggerRef]);

  return closeChooser;
}
