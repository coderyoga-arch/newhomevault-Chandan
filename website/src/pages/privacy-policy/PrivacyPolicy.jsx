import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="page-banner">
        <h1>Privacy Policy</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.4)" }}>›</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.6)" }}>Privacy Policy</span>
        </div>
      </div>

      <section className="section legal-content-section">
        <div className="container legal-container">
          <div className="legal-card">
            <div className="legal-dates">
              <p><strong>Effective Date:</strong> November 17, 2017</p>
              <p><strong>Last Updated:</strong> February 23, 2026</p>
            </div>

            <div className="company-info-block">
              <h3>Company Information</h3>
              <p>5010 Steeles Ave West, Suite 11A, Toronto, M9V 5C6, Canada</p>
              <p><strong>Email:</strong> info@newhomevault.com</p>
              <p>
                <strong>Office Hours:</strong><br />
                Monday – Saturday<br />
                9:00 AM – 9:00 PM
              </p>
              <p className="governance-text">
                This Privacy Policy governs the website: <strong>www.newhomevault.com</strong>
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-body">
              <h3>1. Introduction</h3>
              <p>
                newhomevault.com (“we,” “our,” or “us”) operates under HomeLife/Miracle Realty Ltd., Brokerage.
                We are committed to protecting your privacy and safeguarding your personal information.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, retain, and protect your information
                when you visit our website or use our services.
              </p>
              <p>
                We comply with applicable privacy and electronic communication laws, including Canada’s Anti-Spam
                Legislation (CASL), the CAN-SPAM Act, and the General Data Protection Regulation (GDPR), where applicable.
              </p>
              <p>By using our website, you consent to the practices described in this Policy.</p>

              <h3>2. Definitions</h3>
              <p><strong>Personally Identifiable Information (PII)</strong><br />
                Information that identifies you as an individual, including your name, email address, phone number,
                mailing address, financial details, or other information you provide.
              </p>
              <p><strong>Non-Personal Information (NPI)</strong><br />
                Information that does not directly identify you, such as browser type, IP address, device type,
                operating system, and general usage data.
              </p>

              <h3>3. Information We Collect</h3>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Occupation and employment information</li>
                <li>Financial or payment details (where applicable)</li>
                <li>Any additional information you voluntarily provide</li>
              </ul>
              <p>You control the information you provide. Certain information may be required to deliver services or respond to inquiries.</p>

              <h4>Information You Provide</h4>
              <ul>
                <li>Complete contact or registration forms</li>
                <li>Subscribe to newsletters</li>
                <li>Request property information</li>
                <li>Purchase services</li>
                <li>Contact us directly</li>
              </ul>

              <h4>Automatically Collected Information</h4>
              <ul>
                <li>IP address</li>
                <li>Internet service provider</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Referring and exit pages</li>
                <li>Website usage patterns</li>
              </ul>

              <h4>Location Information</h4>
              <p>We may collect general location data through IP-based tracking to improve service delivery and advertising relevance.</p>

              <h3>4. Use of Cookies</h3>
              <p>Our website uses cookies and similar tracking technologies to enhance functionality and user experience.</p>
              <p><strong>Types of Cookies:</strong></p>
              <ul>
                <li>Strictly Necessary Cookies</li>
                <li>Performance Cookies</li>
                <li>Functional Cookies</li>
                <li>Advertising Cookies</li>
              </ul>

              <h3>5. Third-Party Advertising and Analytics</h3>
              <p>
                We may use third-party services such as Google Analytics to understand user behavior and deliver relevant advertising.
              </p>

              <h3>6. How We Use Your Information</h3>
              <ul>
                <li>Provide real estate advisory services</li>
                <li>Respond to inquiries</li>
                <li>Deliver requested information</li>
                <li>Send updates (with consent)</li>
                <li>Improve website performance</li>
                <li>Comply with legal requirements</li>
              </ul>
              <p>We do not sell your personal information.</p>

              <h3>7. Sharing of Information</h3>
              <ul>
                <li>With affiliated real estate professionals</li>
                <li>With trusted service providers</li>
                <li>To comply with legal obligations</li>
                <li>During merger or acquisition</li>
              </ul>

              <h3>8. Data Retention</h3>
              <p>We retain personal information only as long as necessary for legal, regulatory, tax, or business purposes.</p>

              <h3>9. Your Rights</h3>
              <ul>
                <li>Access your information</li>
                <li>Correct inaccuracies</li>
                <li>Request deletion</li>
                <li>Withdraw consent</li>
                <li>Object to processing</li>
              </ul>
              <p>Contact: info@newhomevault.com</p>

              <h3>10. Email Communications</h3>
              <p>You may opt out of marketing emails at any time using unsubscribe links.</p>

              <h3>11. Security</h3>
              <p>We implement reasonable safeguards; however, absolute security cannot be guaranteed.</p>

              <h3>12. Children’s Privacy</h3>
              <p>Our website is not intended for individuals under the age of 13.</p>

              <h3>13. Third-Party Websites</h3>
              <p>We are not responsible for privacy practices of third-party websites.</p>

              <h3>14. International Data Transfers</h3>
              <p>Information may be processed outside your country of residence with safeguards in place.</p>

              <h3>15. Do Not Track</h3>
              <p>Our website does not respond to browser Do Not Track signals.</p>

              <h3>16. Changes to Policy</h3>
              <p>We may update this policy periodically. Continued use constitutes acceptance.</p>

              <h3>17. Contact Information</h3>
              <p>
                newhomevault.com<br />
                HomeLife/Miracle Realty Ltd., Brokerage<br />
                1339 Matheson Blvd E<br />
                Mississauga, ON L4W 1R1<br />
                Canada
              </p>
              <p>Email: info@newhomevault.com</p>
              <p>
                Office Hours:<br />
                Monday – Saturday<br />
                9:00 AM – 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
