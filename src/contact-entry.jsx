import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactSection from './ContactSection.jsx';

function mountContactSection() {
  const app = document.getElementById('top');
  const main = app?.querySelector('main');
  const downloadSection = main?.querySelector('#download');

  if (!main || !downloadSection) {
    window.requestAnimationFrame(mountContactSection);
    return;
  }

  let mount = document.getElementById('contact-mount');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'contact-mount';
    main.insertBefore(mount, downloadSection);
    createRoot(mount).render(
      <React.StrictMode>
        <ContactSection />
      </React.StrictMode>,
    );
  }

  const pilotActions = app.querySelector('.pilot-actions');
  if (pilotActions && !pilotActions.querySelector('a[href="#contact"]')) {
    const contactLink = document.createElement('a');
    contactLink.className = 'button button-white';
    contactLink.href = '#contact';
    contactLink.textContent = 'Request a pilot';
    pilotActions.prepend(contactLink);
  }

  const footerLinks = app.querySelector('.footer-inner > div:last-child');
  if (footerLinks && !footerLinks.querySelector('a[href="#contact"]')) {
    const contactLink = document.createElement('a');
    contactLink.href = '#contact';
    contactLink.textContent = 'Contact';
    footerLinks.append(contactLink);
  }
}

window.requestAnimationFrame(mountContactSection);
