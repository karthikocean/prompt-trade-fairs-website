import React, { useState } from "react";

const EnquiryForm = ({ 
  isExpoRegistration = false,
  expoInfo = null,
  onClose = () => {},
  isSimplified = false,
  hideHeader = false,
  customClass = ""
}) => {
  const [enquiryType, setEnquiryType] = useState("stalls"); // "stalls" or "visitors"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    subject: "",
    status: "Enquiry",
    category: "",
    stallNo: "",
    stallType: "Auto fetch",
    sqm: "Auto fetch",
    totalAmount: "Auto fetch",
    products: "",
    address: "",
    remark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // VALIDATION: Name only letters and spaces
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // VALIDATION: Phone only numbers and max 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { type: enquiryType, ...formData });
    alert("Enquiry Submitted Successfully ✅");
    onClose();
  };

  return (
    <div className="modern-enquiry-form" style={{ 
      background: hideHeader ? 'transparent' : '#fff', 
      borderRadius: hideHeader ? '0' : '8px', 
      overflow: 'hidden', 
      boxShadow: hideHeader ? 'none' : '0 20px 60px rgba(0,0,0,0.4)', 
      width: '100%',
      maxHeight: hideHeader ? 'none' : '90vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* SOLID RED HEADER */}
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
            {isSimplified ? "EXPRESS INTEREST" : (enquiryType === "stalls" ? "ADD STALL ENQUIRY" : "ADD ENQUIRY")}
          </h3>
          <div 
            onClick={onClose} 
            style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <i className="fas fa-times" style={{ fontSize: '14px' }}></i>
          </div>
        </div>
      )}

      {/* TYPE SELECTOR - Hide if simplified */}
      {!isSimplified && (
        <div className="enquiry-type-selector" style={{ 
          display: 'flex', 
          gap: '20px', 
          padding: '15px 25px', 
          background: '#fcfcfc', 
          borderBottom: '1px solid #eee',
          flexShrink: 0
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: enquiryType === "stalls" ? '#ED1C24' : '#555' }}>
            <input 
              type="radio" 
              name="enquiryType" 
              value="stalls" 
              checked={enquiryType === "stalls"} 
              onChange={() => setEnquiryType("stalls")} 
            />
            <span>Stall Enquiry</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: enquiryType === "visitors" ? '#ED1C24' : '#555' }}>
            <input 
              type="radio" 
              name="enquiryType" 
              value="visitors" 
              checked={enquiryType === "visitors"} 
              onChange={() => setEnquiryType("visitors")} 
            />
            <span>Visitor Registration</span>
          </label>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        {/* SCROLLABLE AREA */}
        <div className={`scrollable-fields-container ${customClass}`} style={{ 
          padding: hideHeader ? '0' : '25px', 
          overflowY: hideHeader ? 'visible' : 'auto', 
          flexGrow: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: '#ED1C24 #f1f1f1'
        }}>
          {isSimplified ? (
            /* SIMPLIFIED MODE - ONLY NAME, PHONE, EMAIL, MESSAGE */
            <div className="simplified-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" pattern="[A-Za-z\s]+" title="Only letters and spaces allowed" required />
              </div>
              <div className="form-group">
                <label style={labelStyle}>Phone Number *</label>
                <input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit Number" maxLength="10" pattern="\d{10}" title="Must be exactly 10 digits" required />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Email Address *</label><input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" required /></div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Your Message</label><textarea style={textareaStyle} name="remark" value={formData.remark} onChange={handleChange} placeholder="How can we help you?"></textarea></div>
            </div>
          ) : (
            /* NORMAL MODES */
            enquiryType === "stalls" ? (
              <div className="stall-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group"><label style={labelStyle}>Name *</label><input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" pattern="[A-Za-z\s]+" title="Only letters allowed" required /></div>
                <div className="form-group"><label style={labelStyle}>Company Name *</label><input style={inputStyle} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company" required /></div>
                <div className="form-group"><label style={labelStyle}>Mobile Number *</label><input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit Mobile" maxLength="10" pattern="\d{10}" title="10 digits only" required /></div>
                
                {/* MOVED EMAIL HERE AND REMOVED STATUS */}
                <div className="form-group"><label style={labelStyle}>Email *</label><input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required /></div>
                
                <div className="form-group"><label style={labelStyle}>Category *</label>
                  <select style={inputStyle} name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Interior">Interior</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>

                {/* ADDED PRODUCTS HERE */}
                <div className="form-group"><label style={labelStyle}>Products *</label><input style={inputStyle} type="text" name="products" value={formData.products} onChange={handleChange} placeholder="Enter Products" required /></div>

                <div className="form-group"><label style={labelStyle}>Stall No *</label>
                  <select style={inputStyle} name="stallNo" value={formData.stallNo} onChange={handleChange} required>
                    <option value="">Select or Search Stall No</option>
                    <option value="A1">A1</option>
                  </select>
                </div>
                <div className="form-group"><label style={labelStyle}>Stall Type</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="stallType" value={formData.stallType} readOnly /></div>
                <div className="form-group"><label style={labelStyle}>Sqm</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="sqm" value={formData.sqm} readOnly /></div>
                <div className="form-group"><label style={labelStyle}>Total Amount</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="totalAmount" value={formData.totalAmount} readOnly /></div>
                
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Address</label><textarea style={textareaStyle} name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address"></textarea></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Remark</label><textarea style={textareaStyle} name="remark" value={formData.remark} onChange={handleChange} placeholder="Enter Remark"></textarea></div>
                
                <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label style={labelStyle}>City</label><input style={inputStyle} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" /></div>
                  <div className="form-group"><label style={labelStyle}>State</label><input style={inputStyle} type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" /></div>
                  <div className="form-group"><label style={labelStyle}>Pincode</label><input style={inputStyle} type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" /></div>
                </div>
              </div>
            ) : (
              <div className="visitor-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="form-group"><label style={labelStyle}>Name *</label><input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" pattern="[A-Za-z\s]+" title="Only letters allowed" required /></div>
                <div className="form-group"><label style={labelStyle}>Phone *</label><input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit Phone" maxLength="10" pattern="\d{10}" title="Must be exactly 10 digits" required /></div>
                <div className="form-group"><label style={labelStyle}>Email *</label><input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" required /></div>
                <div className="form-group"><label style={labelStyle}>Company Name (Optional)</label><input style={inputStyle} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" /></div>
              </div>
            )
          )}
        </div>

        {/* FOOTER */}
        <div className="form-actions-screenshot" style={{ 
          padding: hideHeader ? '0' : '20px 25px', 
          borderTop: hideHeader ? 'none' : '1px solid #e5e7eb',
          display: hideHeader ? 'block' : 'grid',
          gridTemplateColumns: hideHeader ? 'none' : '1fr 1fr',
          gap: '15px',
          background: hideHeader ? 'transparent' : '#fff',
          flexShrink: 0
        }}>
          {!hideHeader && <button type="button" onClick={onClose} style={{...cancelBtnStyle, width: '100%'}}>Cancel</button>}
          <button type="submit" style={{...saveBtnStyle, width: '100%'}}>Send Message</button>
        </div>
      </form>
    </div>
  );
};

const labelStyle = { fontSize: '0.9rem', fontWeight: '700', color: '#4b5563', marginBottom: '8px', display: 'block' };
const inputStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', boxSizing: 'border-box', background: '#f8fafc', transition: '0.3s' };
const textareaStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', minHeight: '120px', boxSizing: 'border-box', background: '#f8fafc', transition: '0.3s' };
const cancelBtnStyle = { padding: '12px 30px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' };
const saveBtnStyle = { padding: '15px 40px', background: '#ed1c24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', transition: '0.3s', boxShadow: '0 8px 20px rgba(237,28,36,0.2)' };

export default EnquiryForm;
