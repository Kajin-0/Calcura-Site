import Logo from './Logo.jsx';
import { TEACHER_SIGN_IN_URL, WEB_APP_URL } from '../site/links.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Free calculus practice for students. Classroom tools for educators.</p>
        </div>

        <nav className="footer-column" aria-labelledby="footer-students">
          <h2 id="footer-students">Students</h2>
          <a href="/#features">Features</a>
          <a href={WEB_APP_URL}>Open the web app</a>
        </nav>

        <nav className="footer-column" aria-labelledby="footer-teachers">
          <h2 id="footer-teachers">Educators</h2>
          <a href="/classroom/">Classroom</a>
          <a href="/classroom/#pricing">Tiers</a>
          <a href={TEACHER_SIGN_IN_URL}>Teacher access</a>
        </nav>

        <nav className="footer-column" aria-labelledby="footer-company">
          <h2 id="footer-company">Calcura</h2>
          <a href="/contact/">Contact</a>
        </nav>
      </div>
      <div className="shell footer-base">
        <span>© Calcura</span>
      </div>
    </footer>
  );
}
