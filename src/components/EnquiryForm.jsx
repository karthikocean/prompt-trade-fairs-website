import React, { useState, useEffect } from "react";
import {
  createEnquiry,
  createStallEnquiry,
  createVisitorEnquiry,
  createInterestEnquiry,
  createContactEnquiry
} from "../api/common.api";
import toast from "react-hot-toast";

const EnquiryForm = ({
  isExpoRegistration = false,
  expoInfo = null,
  onClose = () => { },
  isSimplified = false,
  hideHeader = false,
  customClass = ""
}) => {
  const [enquiryType, setEnquiryType] = useState("stalls"); // "stalls" or "visitors"

  // RESET DATA ON TAB SWITCH
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      companyName: "",
      mobileNo: "",
      productOfInterest: "",
      businessCategory: "",
      stallSize: "",
      city: "",
      remark: "",
    });
    setErrors({});
  }, [enquiryType]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    mobileNo: "",
    productOfInterest: "",
    businessCategory: "",
    stallSize: "",
    city: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // VALIDATION: Name only letters (no numbers or special characters)
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // VALIDATION: Mobile only numbers and max 10 digits
    if (name === "mobileNo") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    // VALIDATION: City only alphabets
    if (name === "city") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (formData.mobileNo.length !== 10) {
      newErrors.mobileNo = "Mobile Number must be 10 digits";
    }

    if (formData.email.trim()) {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email Address is invalid";
      }
    }

    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSimplified) {
        if (expoInfo?._id) {
          const payload = {
            expoId: expoInfo._id,
            name: formData.name,
            phone: formData.mobileNo,
            email: formData.email,
            message: formData.remark || `Interested in ${expoInfo.expoName}`
          };
          await createInterestEnquiry(payload);
        } else {
          const payload = {
            name: formData.name,
            phone: formData.mobileNo,
            email: formData.email,
            message: formData.remark || "Website Enquiry"
          };
          await createContactEnquiry(payload);
        }
      } else if (enquiryType === "visitors") {
        const payload = {
          expoId: expoInfo?._id,
          type: "Visitor Registration",
          name: formData.name,
          mobileNo: formData.mobileNo,
          email: formData.email,
          city: formData.city,
          productOfInterest: formData.productOfInterest
        };
        await createEnquiry(payload);
      } else {
        const payload = {
          expoId: expoInfo?._id,
          type: "Stall Booking",
          name: formData.name,
          companyName: formData.companyName,
          mobileNo: formData.mobileNo,
          email: formData.email,
          city: formData.city,
          businessCategory: formData.businessCategory,
          stallSize: formData.stallSize,
          remarks: formData.remark
        };
        await createEnquiry(payload);
      }

      toast.success("Enquiry Submitted Successfully!");

      setFormData({
        name: "",
        email: "",
        companyName: "",
        mobileNo: "",
        productOfInterest: "",
        businessCategory: "",
        stallSize: "",
        city: "",
        remark: "",
      });
      setErrors({});

      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modern-enquiry-form" style={{
      background: hideHeader ? 'transparent' : '#fff',
      borderRadius: hideHeader ? '0' : '8px',
      overflow: hideHeader ? 'visible' : 'hidden',
      boxShadow: hideHeader ? 'none' : '0 20px 60px rgba(0,0,0,0.4)',
      width: '100%',
      maxHeight: hideHeader ? 'none' : '90vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!hideHeader && (
        <div className="form-header-screenshot" style={{
          background: '#ED1C24',
          padding: '15px 25px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isExpoRegistration && expoInfo ? `Register for ${expoInfo.expoName}` : "ENQUIRY FORM"}
          </h3>
          <div onClick={onClose} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fas fa-times" style={{ fontSize: '14px' }}></i>
          </div>
        </div>
      )}

      {!isSimplified && (
        <div className="enquiry-tabs" style={{ display: 'flex', gap: '20px', padding: '15px 25px', background: '#fcfcfc', borderBottom: '1px solid #eee' }}>
          <button type="button" onClick={() => setEnquiryType("stalls")} style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
            background: enquiryType === "stalls" ? '#ED1C24' : '#f3f3f3',
            color: enquiryType === "stalls" ? '#fff' : '#555',
            border: 'none',
            transition: 'background 0.3s, color 0.3s',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Stall Booking
          </button>
          <button type="button" onClick={() => setEnquiryType("visitors")} style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
            background: enquiryType === "visitors" ? '#ED1C24' : '#f3f3f3',
            color: enquiryType === "visitors" ? '#fff' : '#555',
            border: 'none',
            transition: 'background 0.3s, color 0.3s',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Visitor Registration
          </button>
        </div>
      )}

      <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: hideHeader ? 'visible' : 'hidden', width: '100%', maxWidth: '100%' }}>
        <style>{`
        .form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.remarks-field {
  grid-column: 1 / -1;
}

.form-grid input,
.form-grid textarea {
  transition: all 0.3s ease !important;
}

.form-grid input:focus,
.form-grid textarea:focus {
  border-color: #ED1C24 !important;
  background: #ffffff !important;
  box-shadow: 0 0 0 4px rgba(237, 28, 36, 0.15) !important;
  outline: none !important;
}

.form-actions-v3 {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  gap: 12px !important;
  flex-wrap: nowrap !important;
}

.form-actions-v3 button {
  flex: none !important;
  height: 46px !important;
  width: auto !important;
  min-width: 160px !important;
  padding: 0 30px !important;
}

@media (max-width: 991px) {
  .remarks-field {
    grid-column: auto !important;
  }
}

@media (max-width: 991px) {
  .form-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }

  .form-group {
    width: 100% !important;
    max-width: 100% !important;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100% !important;
    display: block !important;
  }
}

@media (max-width: 991px) {
  .form-actions-v3 {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10px !important;
  }

  .form-actions-v3 button {
    flex: none !important;
    width: auto !important;
    min-width: 140px !important;
    height: 44px !important;
    padding: 0 20px !important;
  }
}
          
@media (max-width: 768px) {
 .modern-enquiry-form {
    width: 100% !important;
    max-width: 100% !important;
  }

  .scrollable-fields-container {
    padding: 12px !important;
  }

  .form-header-screenshot {
    padding: 10px 15px !important;
  }

  .form-header-screenshot h3 {
    font-size: 0.85rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 85% !important;
  }

  .enquiry-tabs {
    gap: 10px !important;
    padding: 10px 15px !important;
  }

  .enquiry-tabs button {
    padding: 8px !important;
    font-size: 12px !important;
  }

  .scrollable-fields-container {
    padding: 15px !important;
  }
}

@media (min-width: 769px) and (max-width: 991px) {
  .modern-enquiry-form {
    width: 85vw !important;
  }
}
        `}</style>
        <div className={`scrollable-fields-container ${customClass}`} style={{
          padding: hideHeader ? '0' : '25px',
          overflowY: hideHeader ? 'visible' : 'auto',
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>

          <div className="form-grid">

            {/* Common fields with conditional order or fields based on selected tab */}
            {enquiryType === "stalls" || isSimplified ? (
              // STALL BOOKING FIELDS
              <>
                <div className="form-group">
                  <label style={labelStyle}>Name *</label>
                  <input style={{ ...inputStyle, borderColor: errors.name ? '#ED1C24' : '#e2e8f0' }} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                  {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Company Name</label>
                  <input style={{ ...inputStyle, borderColor: errors.companyName ? '#ED1C24' : '#e2e8f0' }} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Mobile Number *</label>
                  <input style={{ ...inputStyle, borderColor: errors.mobileNo ? '#ED1C24' : '#e2e8f0' }} type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter 10-digit Mobile" maxLength="10" />
                  {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Email ID</label>
                  <input style={{ ...inputStyle, borderColor: errors.email ? '#ED1C24' : '#e2e8f0' }} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID" />
                  {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Business Category</label>
                  <input style={inputStyle} type="text" name="businessCategory" value={formData.businessCategory} onChange={handleChange} placeholder="Enter Business Category" />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Stall Size</label>
                  <input style={inputStyle} type="text" name="stallSize" value={formData.stallSize} onChange={handleChange} placeholder="Enter Stall Size" />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>City *</label>
                  <input style={{ ...inputStyle, borderColor: errors.city ? '#ED1C24' : '#e2e8f0' }} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" />
                  {errors.city && <span style={errorTextStyle}>{errors.city}</span>}
                </div>
                <div className="form-group remarks-field">
                  <label style={labelStyle}>Remarks</label>
                  <textarea
                    rows={1}
                    style={{
                      ...textareaStyle,
                      borderColor: errors.remark ? '#ED1C24' : '#e2e8f0'
                    }}
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    placeholder="Enter Remarks"
                  />
                </div>
              </>
            ) : (
              // VISITOR REGISTRATION FIELDS
              <>
                <div className="form-group">
                  <label style={labelStyle}>Name *</label>
                  <input style={{ ...inputStyle, borderColor: errors.name ? '#ED1C24' : '#e2e8f0' }} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                  {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Mobile Number *</label>
                  <input style={{ ...inputStyle, borderColor: errors.mobileNo ? '#ED1C24' : '#e2e8f0' }} type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter 10-digit Mobile" maxLength="10" />
                  {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Company Name</label>
                  <input style={inputStyle} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Email ID</label>
                  <input style={{ ...inputStyle, borderColor: errors.email ? '#ED1C24' : '#e2e8f0' }} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID" />
                  {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Product of Interest</label>
                  <input style={inputStyle} type="text" name="productOfInterest" value={formData.productOfInterest} onChange={handleChange} placeholder="Enter Product of Interest" />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>City *</label>
                  <input style={{ ...inputStyle, borderColor: errors.city ? '#ED1C24' : '#e2e8f0' }} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" />
                  {errors.city && <span style={errorTextStyle}>{errors.city}</span>}
                </div>
              </>

            )}

          </div>

        </div>

        <div
          className="form-actions-v3"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            padding: "20px 25px 25px",
            background: "transparent",
            borderTop: "none"
          }}
        >
          {!hideHeader && <button type="button" onClick={onClose} className="modal-btn-cancel" style={cancelBtnStyle}>Cancel</button>}
          <button type="submit" disabled={isSubmitting} className="modal-btn-submit" style={saveBtnStyle}>
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

const labelStyle = { fontSize: '0.85rem', fontWeight: '700', color: '#4b5563', marginBottom: '6px', display: 'block' };
const inputStyle = {
  width: '100%',
  height: '50px',
  padding: '12px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  background: '#f8fafc',
  transition: '0.3s',
  outline: 'none'
};

const textareaStyle = {
  width: '100%',
  height: '50px !important',
  padding: '12px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  background: '#f8fafc',
  transition: '0.3s',
  resize: 'none',
  outline: 'none'
};


const cancelBtnStyle = {
  height: '46px',
  padding: '0 30px',
  background: '#6c757d',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '1',
  transition: 'all 0.3s ease'
};

const saveBtnStyle = {
  height: '46px',
  padding: '0 40px',
  background: '#ed1c24',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '0.95rem',
  fontWeight: '800',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '1',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(237, 28, 36, 0.2)'
};
const errorTextStyle = { color: '#ED1C24', fontSize: '0.7rem', marginTop: '4px', display: 'block', fontWeight: '600' };

export default EnquiryForm;
