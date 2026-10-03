import { useId, useRef, useState } from 'react';
import { useDownloadChooserLifecycle } from '../site/useDownloadChooserLifecycle.js';
import { ANDROID_DOWNLOAD_URL, PWA_INSTALL_URL } from '../site/links.js';
import { AndroidIcon, Arrow, ChevronDown, GlobeIcon, ShareIcon } from './Icons.jsx';

// Platform is read when the chooser opens, never during render, so the server-rendered markup
// and the first client render are identical (no hydration mismatch) and always reflect the
// visitor's actual device.
function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop';
  const userAgent = navigator.userAgent || '';
  const isIOS =
    /iPad|iPhone|iPod/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'desktop';
}

export default function DownloadChooser({
  className = '',
  size = '',
  variant = 'secondary',
  shortLabel = '',
  align = 'start',
}) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState('desktop');
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const triggerId = useId();

  const variantClass = variant === 'primary' ? 'button' : 'button button-secondary';
  const sizeClass = size === 'small' ? ' button-small' : '';
  const isIOS = platform === 'ios';
  const isAndroid = platform === 'android';

  const closeChooser = useDownloadChooserLifecycle({ open, setOpen, rootRef, triggerRef });

  const openChooser = () => {
    setPlatform(detectPlatform());
    setOpen(true);
  };

  const webAppDetail = isAndroid
    ? 'Add Calcura to your device'
    : isIOS
      ? 'Then install from Safari'
      : 'Desktop, phone, and tablet';

  return (
    <div
      className={`download-chooser download-chooser--${align}${className ? ` ${className}` : ''}`}
      ref={rootRef}
    >
      <button
        type="button"
        id={triggerId}
        ref={triggerRef}
        className={`${variantClass}${sizeClass}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => (open ? closeChooser() : openChooser())}
      >
        {shortLabel ? (
          <>
            <span className="chooser-label-full">Download Calcura</span>
            <span className="chooser-label-short">{shortLabel}</span>
          </>
        ) : (
          <>Download Calcura</>
        )}
        {variant === 'primary' && !shortLabel ? <Arrow /> : <ChevronDown className="chooser-caret" />}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          className="download-chooser-panel"
        >
          <p id={`${panelId}-title`} className="download-chooser-title">Get Calcura</p>
          <div className="download-chooser-options">
            <a
              className="download-chooser-option"
              href={PWA_INSTALL_URL}
              onClick={() => closeChooser({ restoreFocus: false })}
            >
              <span className="chooser-option-icon"><GlobeIcon /></span>
              <span className="chooser-option-text">
                <strong>Install web app</strong>
                <span>{webAppDetail}</span>
              </span>
            </a>
            {!isIOS ? (
              <a
                className="download-chooser-option"
                href={ANDROID_DOWNLOAD_URL}
                onClick={() => closeChooser({ restoreFocus: false })}
              >
                <span className="chooser-option-icon"><AndroidIcon /></span>
                <span className="chooser-option-text">
                  <strong>Download Android APK</strong>
                  <span>Native Android package</span>
                </span>
              </a>
            ) : null}
          </div>
          {isIOS ? (
            <div className="download-chooser-ios-note">
              <span className="chooser-option-icon"><ShareIcon /></span>
              <span className="chooser-option-text">
                <strong>Install on iPhone or iPad</strong>
                <span>Open Calcura in Safari, tap Share, then choose Add to Home Screen.</span>
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
