import React, { useState } from "react";

const EnquiryForm = ({ 
  isExpoRegistration = false,
  expoInfo = null,
  onClose = () => {},
  isSimplified = false // New prop to show only Name, Phone, Email
}) => {
  const [enquiryType, setEnquiryType] = useState("stalls"); // "stalls" or "visitors"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { type: enquiryType, ...formData });
    alert("Enquiry Submitted Successfully ✅");
    onClose();
  };

  return (
    <div className="modern-enquiry-form" style={{ 
      background: '#fff', 
      borderRadius: '8px', 
      overflow: 'hidden', 
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)', 
      width: '100%',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* SOLID RED HEADER */}
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
        <button 
          onClick={onClose} 
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0.8' }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

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
        <div className="scrollable-fields-container" style={{ 
          padding: '25px', 
          overflowY: 'auto', 
          flexGrow: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: '#ED1C24 #f1f1f1'
        }}>
          {isSimplified ? (
            /* SIMPLIFIED MODE - ONLY NAME, PHONE, EMAIL */
            <div className="simplified-form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group"><label style={labelStyle}>Name *</label><input style={inputStyle} type="text" name="name" placeholder="Enter Name" required /></div>
              <div className="form-group"><label style={labelStyle}>Phone Number *</label><input style={inputStyle} type="tel" name="phone" placeholder="Enter Phone Number" required /></div>
              <div className="form-group"><label style={labelStyle}>Email *</label><input style={inputStyle} type="email" name="email" placeholder="Enter Email Address" required /></div>
            </div>
          ) : (
            /* NORMAL MODES */
            enquiryType === "stalls" ? (
              <div className="stall-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group"><label style={labelStyle}>Name *</label><input style={inputStyle} type="text" name="name" placeholder="Enter Name" required /></div>
                <div className="form-group"><label style={labelStyle}>Company Name *</label><input style={inputStyle} type="text" name="companyName" placeholder="Enter Company" required /></div>
                <div className="form-group"><label style={labelStyle}>Mobile Number *</label><input style={inputStyle} type="tel" name="phone" placeholder="Enter Mobile" required /></div>
                <div className="form-group"><label style={labelStyle}>Status *</label>
                  <select style={inputStyle} name="status" value={formData.status} onChange={handleChange}>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Booking">Booking</option>
                  </select>
                </div>
                <div className="form-group"><label style={labelStyle}>Category *</label>
                  <select style={inputStyle} name="category" required>
                    <option value="">Select Category</option>
                    <option value="Interior">Interior</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>
                <div className="form-group"><label style={labelStyle}>Email *</label><input style={inputStyle} type="email" name="email" placeholder="Enter Email" required /></div>
                <div className="form-group"><label style={labelStyle}>Stall No *</label>
                  <select style={inputStyle} name="stallNo" required>
                    <option value="">Select or Search Stall No</option>
                    <option value="A1">A1</option>
                  </select>
                </div>
                <div className="form-group"><label style={labelStyle}>Stall Type</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="stallType" value={formData.stallType} readOnly /></div>
                <div className="form-group"><label style={labelStyle}>Sqm</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="sqm" value={formData.sqm} readOnly /></div>
                <div className="form-group"><label style={labelStyle}>Total Amount</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" name="totalAmount" value={formData.totalAmount} readOnly /></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Products</label>
                  <select style={inputStyle} name="products">
                    <option value="">Select Products...</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Address</label><textarea style={textareaStyle} name="address" placeholder="Enter Address"></textarea></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Remark</label><textarea style={textareaStyle} name="remark" placeholder="Enter Remark"></textarea></div>
                <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label style={labelStyle}>City</label><input style={inputStyle} type="text" name="city" placeholder="City" /></div>
                  <div className="form-group"><label style={labelStyle}>State</label><input style={inputStyle} type="text" name="state" placeholder="State" /></div>
                  <div className="form-group"><label style={labelStyle}>Pincode</label><input style={inputStyle} type="text" name="pincode" placeholder="Pincode" /></div>
                </div>
              </div>
            ) : (
              <div className="visitor-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="form-group"><label style={labelStyle}>Name *</label><input style={inputStyle} type="text" name="name" placeholder="Enter Name" required /></div>
                <div className="form-group"><label style={labelStyle}>Phone *</label><input style={inputStyle} type="tel" name="phone" placeholder="Enter 10-digit Phone" required /></div>
                <div className="form-group"><label style={labelStyle}>Email *</label><input style={inputStyle} type="email" name="email" placeholder="Enter Email Address" required /></div>
                <div className="form-group"><label style={labelStyle}>Company Name (Optional)</label><input style={inputStyle} type="text" name="companyName" placeholder="Enter Company Name" /></div>
              </div>
            )
          )}
        </div>

        {/* FOOTER */}
        <div className="form-actions-screenshot" style={{ 
          padding: '20px 25px', 
          borderTop: '1px solid #e5e7eb', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px',
          background: '#fff',
          flexShrink: 0
        }}>
          <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <button type="submit" style={saveBtnStyle}>Save</button>
        </div>
      </form>
    </div>
  );
};

const labelStyle = { fontSize: '0.9rem', fontWeight: '700', color: '#4b5563', marginBottom: '8px', display: 'block' };
const inputStyle = { width: '100%', padding: '12px 15px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' };
const textareaStyle = { width: '100%', padding: '12px 15px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', minHeight: '80px', boxSizing: 'border-box' };
const cancelBtnStyle = { padding: '12px 30px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' };
const saveBtnStyle = { padding: '12px 35px', background: '#ed1c24', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' };

export default EnquiryForm;
