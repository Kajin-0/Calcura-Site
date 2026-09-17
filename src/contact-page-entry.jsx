import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './pages.css';
import ContactSection from './ContactSection.jsx';
import { SiteFooter, SiteHeader } from './site-shell.jsx';

function ContactPage() {
  return (
    <div>
      <SiteHeader active="contact" />
      <main className="contact-page-main">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactPage />
  </React.StrictMode>,
);
