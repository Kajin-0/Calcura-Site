# Legal publication — factual source and approved publication facts

Prepared and finalized 2026-10-04. The public policies are maintained in
`src/pages/PrivacyPage.jsx` and `src/pages/TermsPage.jsx`; the outline below records
the prepared source material, not a separate agreement. No compliance certification
or external legal review is claimed.

## Owner-approved facts and publication

The owner explicitly approved these facts on 2026-10-04:

- Operator/controller: **Brooks Invest LLC**.
- Monitored support/privacy/billing/deletion/export channel:
  https://calcura.study/contact/.
- Refunds: “Fees are non-refundable except where required by law or where Calcura
  expressly states otherwise at purchase.”

The publication routes are `/privacy/` and `/terms/`, effective October 4, 2026.
They use the existing PageShell, CSP/referrer policy, prerender pipeline and mobile
tokens, with canonical metadata/sitemap/footer navigation and source/artifact
regressions. Classroom links follow Site publication. No address, separate email,
jurisdiction, price, compliance claim, checkbox or recorded clickwrap is invented.
Calcura student source/APK and operator export/deletion tooling remain unchanged.

## Verified policy facts

| Claim                                                                     | Authority                                                                                                                                              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public brand: Calcura                                                     | Site root metadata, Organization JSON-LD and shared branding                                                                                           |
| Existing contact delivery provider                                        | `src/pages/contact/ContactForm.jsx`: Formspree endpoint `https://formspree.io/f/mjykvaky`; owner confirmed the monitored request channel on 2026-10-04 |
| Static hosting                                                            | Site/Classroom Pages workflows; current deployed domains                                                                                               |
| Supabase Auth/email and learning/Classroom data                           | Classroom `docs/PRE_SALES_HARDENING_2026-10.md`, current migrations, Calcura `supabase/schemas/` and progress/auth contracts                           |
| Remote attempt/result metadata, not generated equations/answers/solutions | Calcura progress/result payloads; Classroom activity/result contracts                                                                                  |
| Authorized teacher analytics                                              | Enrollment/member RLS and narrow analytics RPCs                                                                                                        |
| Stripe billing / monthly and annual intervals                             | Classroom `docs/ENTITLEMENTS.md`, BillingPage and mode-isolated server helpers                                                                         |
| End-of-period cancellation / Free fallback                                | Canonical Stripe reconciliation and entitlement resolver; cancellation does not erase learning data                                                    |
| Personal cascades vs surviving shared content                             | Auth FKs, personal-owner workspace cascade and nullable creator provenance                                                                             |
| Local account-scoped offline/cache/outbox data may survive sign-out       | Calcura progress/storage contracts; hardening account-switch regressions                                                                               |
| No self-service deletion/export portal                                    | Existing routes; operator-only privacy procedures added in Classroom                                                                                   |
| No universal automatic retention expiry established                       | Schema/provider inventory; receipts retained for reconciliation/deduplication                                                                          |
| No advertising/behavioral tracking integration found                      | Prior hardening inventory and current Site/Classroom/student dependency/import review                                                                  |

## Privacy Policy — prepared factual outline

The published page identifies Brooks Invest LLC and uses October 4, 2026 as its
effective date. The prepared factual outline follows for implementation provenance.

### What information we collect

Calcura uses email/account identifiers and authentication/session information
managed through Supabase. Learning information includes practice attempts,
progress/history, terminal assignment results and performance/learning-taxonomy
metadata. These remote contracts do not store generated problems, student answer
text or worked solutions. Classroom information includes workspace/class membership,
enrollment and assignment metadata, with analytics available to authorized educators.

Stripe processes subscription payments. Calcura keeps limited subscription/billing
state and trusted server mappings needed to operate and reconcile subscriptions;
payment-card processing is handled by Stripe. Contact submissions include the
name, email, topic and message supplied in the contact form and are processed
through Formspree. Do not send passwords, OTP codes, tokens, card details or
unnecessary student records through that form.

### How information is used

To authenticate accounts; save learning progress; deliver Classroom assignments;
show authorized learning analytics; operate subscriptions; respond to support
and privacy requests; prevent abuse/security failures; and maintain reliability.
Calcura does not sell personal information for advertising purposes. Learning
analytics support education, not third-party behavioral advertising.

### Local browser and app storage

The app stores local progress, offline work, account-scoped caches and outboxes.
Signing out does not necessarily erase offline work. Server account deletion or
export cannot itself erase or collect device-only copies. Users can clear local
site/app storage after saving any work they want to retain.

### Service providers and sharing

Supabase supports authentication/database services, Stripe processes payments,
Formspree supports contact submissions, and GitHub Pages hosts static websites.
Providers process information needed for their services. Authorized educators
can see relevant enrolled-student progress; this is not public disclosure of
all account records. Information may also be disclosed where necessary for legal
requirements, safety, abuse prevention or service operation. This policy does
not claim a provider DPA, regulatory certification or a guaranteed data residency.

### Retention and security

Information is retained while reasonably necessary to provide the service,
meet billing/security obligations, resolve disputes or satisfy applicable legal
requirements. There is no promised universal automatic deletion period. Deleting
an account does not necessarily erase every billing/security record immediately;
Stripe records and backups have separate legal/provider lifecycles. Webhook
receipts may remain for reconciliation and deduplication.

Calcura uses access controls and other safeguards to protect information, but no
service can guarantee absolute security. Authentication secrets should never be
shared through support. Do not claim every token becomes instantly invalid upon
account deletion.

### Account deletion and data export

Users may request account deletion or a copy of their personal data through the
verified contact channel. Identity and request scope must be verified before
disclosure/deletion. There is no instant self-service feature or promised public
completion SLA. Subscription cancellation must be reconciled before deleting a
paying personal owner. Shared organizational/educational content may require
transfer or retention review; some creator provenance can be cleared while
shared content remains. Device-only information and external billing/support
records may require separate handling.

### Children, educational institutions and international access

Initial use is focused on adult purchasers/educators and appropriate student use
at age 13+. Calcura is not intended for independent use by children under 13 unless
access is arranged through an authorized parent, guardian, school or educational
institution under an appropriate process. Such a process is not automatically
established by a teacher creating a class; under-13 and district onboarding require
additional review. No COPPA/FERPA or other compliance approval is claimed.

Service providers may process information in countries other than a user's own;
no worldwide data residency or regulatory-compliance guarantee is made.

### Changes and contact

Updates will be published on this page with an updated effective date. For
support, privacy questions, deletion or export, use the owner-confirmed contact
channel. The published page uses the owner-approved operator identity and actual
publication date recorded above.

## Terms of Service — prepared factual outline

The published page identifies Brooks Invest LLC and uses October 4, 2026 as its
effective date.

### Agreement, eligibility and accounts

These Terms govern the Calcura student application and Calcura Classroom.
Using the service is subject to these Terms and applicable law. Purchasers and
subscribers must be legally able to enter a contract. Students must use the
service with any authorization required for their age and circumstances.
Keep account access secure and provide accurate account information. Do not
share OTP codes or session credentials. No consent record is fabricated by this
policy or by adding a link to an authentication page.

### Educational use

Calcura supports learning; its performance metrics are not a guarantee of academic
outcomes or an independently verified certification of student work. Educators
and institutions must use it consistently with applicable policies and law.
Institutional use may require additional agreements, consent or privacy review.
A teacher's involvement does not remove Calcura's own applicable obligations.
Under-13 direct onboarding and school-district approval are not established here.

### Subscriptions, renewal and cancellation

Available plans, prices and billing intervals are shown at purchase. Paid
subscriptions are processed through Stripe and renew according to the selected
monthly/annual terms unless canceled. Authorized workspace owners/admins can
manage billing through the existing billing portal. Cancellation scheduled for
the period end normally preserves paid access until that period ends; the
workspace then falls back to the available Free plan according to trusted billing
state. Past-due/canceled subscriptions can affect paid access. Cancellation is
not account deletion and does not by itself erase learning data. Contact Calcura
through the verified channel for billing assistance.

### Refunds

Owner-approved wording: “Fees are non-refundable except where required by law or
where Calcura expressly states otherwise at purchase.” This preserves any promise
made at purchase. No price or refund amount is invented.

### Acceptable use, intellectual property and user data

Do not attempt unauthorized access, interfere with availability, abuse invitations
or authentication, impersonate others, upload unlawful content, or circumvent
billing/access controls. Calcura and its licensors retain rights in the service;
use does not transfer ownership of software or branding. Users retain their
rights in information/content they provide and authorize processing needed to
provide the service. Do not supply information you are not authorized to use.
Personal-information handling is described in the Privacy Policy.

### Availability and termination

Availability is not guaranteed; maintenance, security events and provider failures
may interrupt service. Access may be suspended or terminated for abuse, unlawful
use or other material violations. Account-deletion requests follow the verified
support process and billing/shared-data review. Applicable mandatory consumer
rights are not waived.

### Disclaimers and limitation of liability

To the extent permitted by applicable law, the service is provided as available
without a promise of uninterrupted operation, suitability for every purpose or
specific learning outcomes. To that same extent, Calcura is not responsible for
indirect or consequential losses arising from use. Nothing in these Terms
excludes liability or rights that cannot lawfully be excluded. No invented
jurisdiction, mandatory arbitration clause or fixed monetary cap is supplied.

### Changes and contact

Changes will be published with an updated effective date. Use the verified contact
channel for support or questions about these Terms. Obtain qualified review where
required for the actual operator/jurisdiction/customer context; this draft is not
a compliance opinion.
