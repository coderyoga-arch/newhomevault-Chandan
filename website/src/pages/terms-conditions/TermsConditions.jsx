import { useNavigate } from "react-router-dom";
import "./TermsConditions.css";

export default function TermsConditions() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="page-banner">
        <h1>Terms & Conditions</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.4)" }}>›</span>
          <span style={{ cursor: "default", color: "rgba(255,255,255,0.6)" }}>Terms & Conditions</span>
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
              <h3>Website Terms of Use</h3>
              <p>newhomevault.com (“Website”) is operated by HomeLife/Miracle Realty Ltd., Brokerage, located at:</p>
              <p>5010 Steeles Ave West, Suite 11A, Toronto, M9V 5C6, Canada</p>
              <p><strong>Email:</strong> newhomevaultofficial@gmail.com</p>
              <p className="governance-text">
                By accessing or using this Website, you agree to be bound by these Terms and Conditions (“Terms”).
                If you do not agree, you must discontinue use of this Website immediately.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-body">
              <h3>1. Introduction</h3>
              <p>
                Welcome to newhomevault.com (“Website”). newhomevault.com is operated by HomeLife/Miracle Realty Ltd., Brokerage.
                These Terms govern your access to and use of our Website and real estate advisory services.
              </p>

              <h3>2. Nature of Services</h3>
              <p>newhomevault.com provides:</p>
              <ul>
                <li>Real estate advisory information</li>
                <li>New home and pre-construction project information</li>
                <li>Market commentary and property marketing</li>
                <li>Consultation and lead generation services</li>
              </ul>
              <p>
                All licensed trading activity is conducted through HomeLife/Miracle Realty Ltd., Brokerage in accordance with applicable Ontario real estate laws.
              </p>
              <p>
                Nothing on this Website constitutes legal, tax, mortgage, financial, appraisal, or investment advice.
              </p>

              <h3>3. Informational Purpose Only</h3>
              <p>
                newhomevault.com and all commentary herein are provided solely for informational and conceptual purposes.
              </p>
              <ul>
                <li>Prices, specifications, incentives, and availability subject to change</li>
                <li>Floor plans and renderings are artist concepts</li>
                <li>E.&nbsp;O.&nbsp;E. (Errors and Omissions Excepted)</li>
              </ul>
              <p>
                Users should consult qualified professionals before making financial, legal, or real estate decisions.
              </p>
              <p>
                If dissatisfied with this Website, your sole remedy is to discontinue use.
              </p>

              <h3>4. No Agency Relationship by Website Use</h3>
              <p>
                Use of this Website does not create a client relationship, brokerage representation agreement, fiduciary duty, or agency relationship.
              </p>
              <p>
                Agency relationships are formed only through written agreements in accordance with Ontario real estate regulations.
              </p>

              <h3>5. Accuracy of Information</h3>
              <ul>
                <li>Builder pricing may change without notice</li>
                <li>Project details may be updated or withdrawn</li>
                <li>Incentives may change at any time</li>
              </ul>
              <p>We do not guarantee completeness or accuracy. Reliance is at your own risk.</p>

              <h3>6. Intellectual Property</h3>
              <p>
                All Website content including text, branding, logos, graphics, images, videos, layout, and design is protected by intellectual property laws.
              </p>
              <p>Unauthorized reproduction or modification is prohibited.</p>

              <h3>7. User Conduct</h3>
              <p>Users agree not to:</p>
              <ul>
                <li>Use the Website for unlawful purposes</li>
                <li>Provide false information</li>
                <li>Attempt unauthorized access</li>
                <li>Interfere with Website functionality</li>
                <li>Distribute malware</li>
              </ul>
              <p>We may restrict access for violations.</p>

              <h3>8. Third-Party Links</h3>
              <p>
                We are not responsible for third-party content, services, or privacy practices. Access external sites at your own risk.
              </p>

              <h3>9. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by law, newhomevault.com shall not be liable for damages, losses, business interruption, or reliance on Website content.
              </p>

              <h3>10. Indemnification</h3>
              <p>
                You agree to indemnify newhomevault.com from claims arising from your use of the Website or violation of these Terms.
              </p>

              <h3>11. Electronic Communications</h3>
              <p>
                By submitting contact information, you consent to receive communications via email, SMS, or telephone in compliance with CASL.
              </p>

              <h3>12. Privacy</h3>
              <p>Your use of this Website is governed by our Privacy Policy.</p>

              <h3>13. No Warranties</h3>
              <p>
                This Website is provided “as is” without warranties regarding availability, accuracy, or error-free operation.
              </p>

              <h3>14. Governing Law</h3>
              <p>
                These Terms are governed by the laws of the Province of Ontario, Canada. Disputes shall be resolved in Ontario courts.
              </p>

              <h3>15. Changes to These Terms</h3>
              <p>
                We may update these Terms periodically. Continued use constitutes acceptance of revisions.
              </p>

              <h3>16. Contact Information</h3>
              <p>
                newhomevault.com<br />
                HomeLife/Miracle Realty Ltd., Brokerage<br />
                1339 Matheson Blvd E<br />
                Mississauga, ON L4W 1R1<br />
                Canada
              </p>
              <p>Email: newhomevaultofficial@gmail.com</p>
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
