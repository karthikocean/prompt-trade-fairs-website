import React from "react";
import EnquiryForm from "./EnquiryForm";

const EnquirySection = () => {
  return (
    <section className="enquiry-section">
      <div className="container enquiry-container">
        {/* LEFT CONTENT */}
        <div className="enquiry-left">
          <span className="section-tag">ENQUIRY</span>

          <h2 className="enquiry-title">Space Booking Enquiry</h2>

          <p className="highlight-text">
            PROMPT TRADE FAIRS – Providing the Right Platform to enhance your
            Business
          </p>

          <p>
            Prompt Trade Fairs India Pvt Ltd., with a vast experience of over a
            decade in the field of organizing Exhibitions are proven
            professionals who best understand your business and provide you with
            the perfect platform.
          </p>

          <p>
            Prompt Trade Fairs India Pvt Ltd., is an organization which embraces
            Professionalism and Excellence in all stages.
          </p>

          <p>
            PROMPT has organized over 1200+ Exhibitions in varied segments
            including Building & Construction, Interior, Property & more.
          </p>

          <p>
            Every Exhibition is planned with strong promotions and ensures great
            business.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="enquiry-form-card-container">
          <EnquiryForm customClass="home-register-form" />
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
