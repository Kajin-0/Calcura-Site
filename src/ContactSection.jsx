import React, { useRef, useState } from 'react';
import './contact.css';

const FORM_ENDPOINT = 'https://formspree.io/f/mjykvaky';

const TOPICS = [
  'General Inquiry',
  'Technical Support',
  'Educator / Classroom',
  'Licensing / Partnership',
  'Other',
];

export default function ContactSection() {
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const statusRef = useRef(null);

  const announceStatus = (nextStatus, message) => {
    setStatus(nextStatus);
    setStatusMessage(message);
    window.requestAnimationFrame(() => statusRef.current?.focus());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus('submitting');
    setStatusMessage('Sending your message…');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        announceStatus('success', "Message sent. We'll get back to you soon.");
        return;
      }

      if (response.status === 429) {
        announceStatus('error', 'Too many messages were sent recently. Please wait a moment and try again.');
        return;
      }

      announceStatus('error', 'We could not send your message. Please check the form and try again.');
    } catch {
      announceStatus('error', 'We could not reach the message service. Check your connection and try again.');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section className="section contact-section" id="contact">
      <div className="shell contact-layout">
        <div className="section-heading contact-heading">
          <div className="eyebrow">CONTACT CALCURA</div>
          <h2>Questions, support, or classroom inquiries.</h2>
          <p>
            Send a message about Calcura, technical support, educator pilots, classroom licensing, or partnerships.
          </p>
          <div className="contact-note">
            <strong>What happens next</strong>
            <span>Your message is delivered to the Calcura contact inbox for a direct response.</span>
          </div>
        </div>

        <form
          className="contact-form"
          action={FORM_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="contact-field-grid">
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-subject">Topic</label>
            <select id="contact-subject" name="subject" defaultValue="" required disabled={isSubmitting}>
              <option value="" disabled>Select a topic</option>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={7}
              maxLength={5000}
              required
              disabled={isSubmitting}
            />
            <span className="contact-field-hint">Up to 5,000 characters.</span>
          </div>

          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-company">Leave this field empty</label>
            <input
              id="contact-company"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="contact-submit-row">
            <button className="button contact-submit" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending…' : 'Send Inquiry'}</span>
            </button>
            <p className="contact-privacy-note">Your details are submitted so Calcura can respond to your inquiry.</p>
          </div>

          <div
            ref={statusRef}
            className={`contact-status${status !== 'idle' ? ` ${status}` : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            tabIndex={status === 'success' || status === 'error' ? -1 : undefined}
          >
            {statusMessage}
          </div>
        </form>
      </div>
    </section>
  );
}
