import { useEffect, useId, useRef, useState } from 'react';
import DownloadChooser from './DownloadChooser.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';
import Logo from './Logo.jsx';
import { TEACHER_SIGN_IN_URL, WEB_APP_URL } from '../site/links.js';

const NAV_ITEMS = [
  { key: 'home', href: '/', label: 'Students' },
  { key: 'classroom', href: '/classroom/', label: 'Classroom' },
  { key: 'contact', href: '/contact/', label: 'Contact' },
];

const DESKTOP_QUERY = '(min-width: 64.0625rem)';

export default function SiteHeader({ active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeMenu = (restoreFocus) => {
      setMenuOpen(false);
      if (restoreFocus) toggleRef.current?.focus();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closeMenu(false);
    };
    const media = window.matchMedia(DESKTOP_QUERY);
    const onMediaChange = (event) => {
      if (event.matches) closeMenu(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    media.addEventListener('change', onMediaChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      media.removeEventListener('change', onMediaChange);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="shell header-bar">
        <Logo />

        <div
          id={menuId}
          className="header-menu"
          data-open={menuOpen ? 'true' : 'false'}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) setMenuOpen(false);
          }}
        >
          <nav className="header-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a key={item.key} href={item.href} aria-current={active === item.key ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-links">
            <a className="header-login" href={WEB_APP_URL}>
              <span className="login-full">Login to Calcura</span>
              <span className="login-short">Login</span>
            </a>
            <a className="button button-secondary button-small" href={TEACHER_SIGN_IN_URL}>Teacher access</a>
          </div>
        </div>

        <div className="header-end">
          <DownloadChooser size="small" variant="primary" shortLabel="Download" align="end" />
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
