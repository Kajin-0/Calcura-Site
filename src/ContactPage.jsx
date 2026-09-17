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
      <main>
        <section className="page-hero">
          <div className="shell page-hero-inner">
            <div className="eyebrow">CONTACT CALCURA</div>
            <h1>Questions, support, or classroom inquiries.</h1>
            <p>
              Use the form below for product questions, technical support, educator pilots, classroom licensing, or partnerships.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><ContactPage /></React.StrictMode>);
