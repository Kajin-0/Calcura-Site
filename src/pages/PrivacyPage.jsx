import LegalPage from './legal/LegalPage.jsx';

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" intro="How Calcura handles information across the student app, Calcura Classroom, and this website.">
      <section>
        <h2>Who operates Calcura</h2>
        <p>Brooks Invest LLC operates Calcura and is the controller of personal information handled by the service. This policy covers Calcura and Calcura Classroom. You can reach us through the <a href="/contact/">Calcura contact page</a> for support, privacy requests, billing questions, account deletion, or data export.</p>
      </section>
      <section>
        <h2>Account and authentication information</h2>
        <p>We use email addresses, account identifiers, and authentication/session information managed through Supabase to provide account access. Do not share passwords, one-time sign-in codes, or session credentials through support.</p>
      </section>
      <section>
        <h2>Learning and progress information</h2>
        <p>Learning information includes practice attempts, progress/history, terminal assignment results, performance metadata, and learning-taxonomy metadata. These remote practice and result contracts store metadata rather than generated problem statements, student answer text, or worked solutions.</p>
      </section>
      <section>
        <h2>Classroom information</h2>
        <p>Classroom information includes workspace and class membership, enrollment, assignment metadata, and analytics available to authorized educators. Relevant enrolled-student progress may be visible to authorized class staff; account information is not made generally public.</p>
      </section>
      <section>
        <h2>Billing information</h2>
        <p>Stripe processes subscription payments and payment-card information. Calcura keeps limited subscription and billing state, such as billing interval, period and cancellation status, and trusted server mappings needed to operate and reconcile subscriptions.</p>
      </section>
      <section>
        <h2>Contact and support submissions</h2>
        <p>Our contact form collects the name, email, topic, and message you provide, and processes submissions through Formspree. Use it for support, privacy, billing, deletion, and export requests. Do not submit passwords, sign-in codes, tokens, card details, or unnecessary student records.</p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>We use information to authenticate accounts, save learning progress, deliver Classroom assignments, show authorized learning analytics, operate subscriptions, respond to support and privacy requests, prevent abuse and security failures, and maintain service reliability.</p>
        <p>Calcura does not sell personal information for advertising purposes. Learning analytics support education, not third-party behavioral advertising.</p>
      </section>
      <section>
        <h2>Local browser and app storage</h2>
        <p>The app stores local progress, offline work, account-scoped caches, and outboxes. Signing out does not necessarily erase offline work. A server account deletion or export cannot itself erase or collect device-only copies. You can clear local site or app storage after saving any work you want to retain.</p>
      </section>
      <section>
        <h2>Service providers and data sharing</h2>
        <p>Supabase supports authentication and database services, Stripe processes payments, Formspree supports contact submissions, and GitHub Pages hosts our static websites. Providers process information needed for their services.</p>
        <p>We share relevant learning information with authorized educators as described above, not with unrelated users. Information may also be disclosed where necessary for legal requirements, safety, abuse prevention, or service operation.</p>
      </section>
      <section>
        <h2>Retention</h2>
        <p>Information is retained while reasonably necessary to provide the service, meet billing or security obligations, resolve disputes, or satisfy applicable legal requirements. There is no universal automatic deletion period.</p>
        <p>Deleting an account does not necessarily erase every billing or security record immediately. Stripe records and backups have separate legal or provider lifecycles. Webhook receipts may remain for reconciliation and deduplication.</p>
      </section>
      <section>
        <h2>Security</h2>
        <p>We use access controls and other safeguards to protect information, but no service can guarantee absolute security. Authentication secrets should never be shared through support.</p>
      </section>
      <section>
        <h2>Account deletion and data export</h2>
        <p>You may request account deletion or a copy of your personal data through our <a href="/contact/">contact page</a>. We verify identity and request scope before disclosure or deletion. These requests are handled through support, not an instant self-service feature.</p>
        <p>Subscription cancellation must be reconciled before deleting a paying personal owner. Shared organizational or educational content may require transfer or retention review; creator provenance can be cleared while shared content remains. Device-only information and external billing or support records may require separate handling.</p>
      </section>
      <section>
        <h2>Children and educational institutions</h2>
        <p>Initial use is focused on adult purchasers and educators and appropriate student use at age 13+. Calcura is not intended for independent use by children under 13 unless access is arranged through an authorized parent, guardian, school, or educational institution under an appropriate process.</p>
        <p>Such a process is not automatically established by a teacher creating a class. Under-13 and school-district onboarding require additional review and are not approved by default. Institutional use may require additional agreements, consent, or privacy review.</p>
      </section>
      <section>
        <h2>International access</h2>
        <p>Service providers may process information in countries other than your own. We do not guarantee that all processing occurs in your country.</p>
      </section>
      <section>
        <h2>Policy changes</h2>
        <p>Updates will be published on this page with an updated effective date.</p>
      </section>
      <section>
        <h2>Contact Calcura</h2>
        <p>For privacy questions, account deletion, data export, support, or billing requests, contact Brooks Invest LLC through the monitored <a href="/contact/">Calcura contact page</a>. See also our <a href="/terms/">Terms of Service</a>.</p>
      </section>
    </LegalPage>
  );
}
