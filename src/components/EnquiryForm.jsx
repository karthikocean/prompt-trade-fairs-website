import React, { useState, useEffect } from "react";

const EnquiryForm = ({ 
  title = "Space Booking Enquiry", 
  isExpoRegistration = false,
  isSimplified = false,
  expoInfo = null,
  customClass = "",
  buttonText = "SUBMIT"
}) => {
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const [formData, setFormData] = useState({
    expo: expoInfo?.name || "",
    name: "",
    service: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    setCaptcha(generateCaptcha());
    if (expoInfo?.title) {
      setFormData(prev => ({ ...prev, expo: expoInfo.title }));
    }
  }, [expoInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSimplified && userCaptcha !== captcha) {
      alert("Invalid Captcha ❌");
      setCaptcha(generateCaptcha());
      setUserCaptcha("");
      return;
    }

    console.log(formData);
    alert("Form Submitted Successfully ✅");
  };

  return (
    <div className={`enquiry-form-card ${isExpoRegistration ? 'no-scroll' : ''} ${customClass}`}>
      {isExpoRegistration && expoInfo ? (
        <div className="expo-header-v3">
          <h3>{expoInfo.title}</h3>
          <div className="expo-brief-info">
             <div className="brief-item">
               <i className="fas fa-calendar-alt" style={{ color: '#ED1C24' }}></i>
               <span>{expoInfo.date}</span>
             </div>
             <div className="brief-item">
               <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i>
               <span>{expoInfo.location}</span>
             </div>
          </div>
        </div>
      ) : title && (
        <h3>{title}</h3>
      )}

      <form onSubmit={handleSubmit}>
        {!isExpoRegistration && !isSimplified && !expoInfo && (
          <>
            <input
              type="text"
              name="expo"
              placeholder="Expo Name *"
              value={formData.expo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="service"
              placeholder="Products / Services *"
              value={formData.service}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile No *"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID *"
          onChange={handleChange}
          required
        />

        {!isSimplified && (
          <input
            type="text"
            name="city"
            placeholder="City *"
            onChange={handleChange}
            required
          />
        )}

        {isSimplified && (
          <textarea
            name="message"
            placeholder="Your Message *"
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              fontSize: '14px',
              minHeight: '100px',
              background: '#f9f9f9',
              outline: 'none',
              transition: '0.3s',
              marginBottom: '12px'
            }}
          ></textarea>
        )}

        {/* CAPTCHA */}
        {!isSimplified && (
          <div className="captcha-box">
            <div className="captcha-code">{captcha}</div>

            <div className="captcha-input-group">
              <input
                type="text"
                placeholder="Enter Captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                required
              />

              <i
                className="fas fa-sync-alt refresh-icon"
                onClick={() => setCaptcha(generateCaptcha())}
                style={{ cursor: "pointer", color: "#ED1C24" }}
              ></i>
            </div>
          </div>
        )}

        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
