import React, { useId, useRef, useState } from 'react';
import { useDownloadChooserLifecycle } from './useDownloadChooserLifecycle';

export const ANDROID_DOWNLOAD_URL =
  'https://github.com/Kajin-0/Calcura-Site/releases/latest/download/Calcura.apk';
export const WEB_APP_URL = '/app/';
export const PWA_INSTALL_URL = '/app/?install=1';

export const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m4.5 10.4 3.2 3.1 7.8-7.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Logo({ homeHref = '/' }) {
  return (
    <a className="brand" href={homeHref} aria-label="Calcura home">
      <span className="brand-mark">∫</span>
      <span>calcura</span>
    </a>
  );
}

export function DownloadChooser({ className = '', size = '', variant = 'secondary', shortLabel = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const triggerId = useId();
  const variantClass = variant === 'primary' ? 'button' : 'button button-secondary';
  const sizeClass = size === 'small' ? ' button-small' : '';
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const isIOS = typeof navigator !== 'undefined' && (
    /iPad|iPhone|iPod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
  const isAndroid = /Android/i.test(userAgent);

  const closeChooser = useDownloadChooserLifecycle({ open, setOpen, rootRef, triggerRef });

  return (
    <div className={`download-chooser${className ? ` ${className}` : ''}`} ref={rootRef}>
      <button
        type="button"
        id={triggerId}
        ref={triggerRef}
        className={`${variantClass}${sizeClass}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => (open ? closeChooser() : setOpen(true))}
      >
        {shortLabel ? (
          <>
            <span className="chooser-label-full">Download Calcura</span>
            <span className="chooser-label-short">{shortLabel}</span>
          </>
        ) : (
          <>Download Calcura{variant === 'primary' ? <Arrow /> : null}</>
        )}
      </button>
      {open ? (
        <div id={panelId} role="dialog" aria-modal="true" aria-labelledby={`${panelId}-title`} className="download-chooser-panel">
          <p id={`${panelId}-title`} className="download-chooser-title">Get Calcura</p>
          <div className="download-chooser-options">
            {isAndroid ? (
              <>
                <a
                  className="download-chooser-option"
                  href={ANDROID_DOWNLOAD_URL}
                  onClick={() => closeChooser({ restoreFocus: false })}
                >
                  <strong>Download Android APK</strong>
                  <span>Native Android package</span>
                </a>
                <a className="download-chooser-option" href={PWA_INSTALL_URL} onClick={() => closeChooser({ restoreFocus: false })}>
                  <strong>Install / Open Calcura</strong>
                  <span>Use Calcura in your browser</span>
                </a>
              </>
            ) : (
              <>
                <a className="download-chooser-option" href={PWA_INSTALL_URL} onClick={() => closeChooser({ restoreFocus: false })}>
                  <strong>Install / Open Calcura</strong>
                  <span>{isIOS ? 'Then install from Safari' : 'Desktop, phone, and tablet'}</span>
                </a>
                {!isIOS ? (
                  <a
                    className="download-chooser-option"
                    href={ANDROID_DOWNLOAD_URL}
                    onClick={() => closeChooser({ restoreFocus: false })}
                  >
                    <strong>Download Android APK</strong>
                    <span>Native Android package</span>
                  </a>
                ) : null}
              </>
            )}
          </div>
          {isIOS ? (
            <div className="download-chooser-ios-note">
              <strong>Install on iPhone or iPad</strong>
              <span>Open Calcura in Safari, tap Share, then choose Add to Home Screen.</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({ active = 'home' }) {
  return (
    <header className="site-header">
      <div className="shell nav-shell multipage-nav-shell">
        <Logo />
        <nav className="multipage-nav" aria-label="Primary navigation">
          <a className={active === 'home' ? 'active' : ''} href="/">Students</a>
          <a className={active === 'classroom' ? 'active' : ''} href="/classroom/">Classroom</a>
          <a className={active === 'contact' ? 'active' : ''} href="/contact/">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="button button-small nav-login" href={WEB_APP_URL}>Login</a>
          <DownloadChooser size="small" shortLabel="Download" />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-inner">
        <Logo />
        <p>Free calculus practice for students. Classroom tools for educators.</p>
        <div>
          <a href="/">Students</a>
          <a href="/classroom/">Classroom</a>
          <a href="/contact/">Contact</a>
        </div>
      </div>
    </footer>
  );
}
