import { Arrow } from '../components/Icons.jsx';
import PageShell from '../components/PageShell.jsx';
import { WEB_APP_URL } from '../site/links.js';
import ContactForm, { TOPICS } from './contact/ContactForm.jsx';

export default function ContactPage() {
  return (
    <PageShell active="contact" pageClass="page-contact">
      <section className="page-hero page-hero--compact" aria-labelledby="contact-title">
        <div className="shell">
          <div className="eyebrow">Contact Calcura</div>
          <h1 id="contact-title">Questions, support, or classroom inquiries.</h1>
          <p className="page-hero-text">
            Send a message about Calcura, technical support, institutional Classroom requirements, or partnerships.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-label="Contact form">
        <div className="shell contact-layout">
          <aside className="contact-aside">
            <div className="contact-note">
              <strong>What happens next</strong>
              <span>Your message is delivered to the Calcura contact inbox for a direct response.</span>
            </div>
            <div className="contact-topics">
              <h2>You can write about</h2>
              <ul>
                {TOPICS.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
            <div className="contact-links">
              <a className="text-link" href="/classroom/">Learn about Calcura Classroom <Arrow /></a>
              <a className="text-link" href={WEB_APP_URL}>Open the free student app <Arrow /></a>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
