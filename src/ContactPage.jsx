import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './refinements.css';
import './multipage.css';
import ContactSection from './ContactSection.jsx';
import { SiteFooter, SiteHeader } from './siteShared.jsx';

function ContactPage() {
  return (
    <div className="contact-page">
      <SiteHeader active="contact" />
      <main><ContactSection /></main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><ContactPage /></React.StrictMode>);
