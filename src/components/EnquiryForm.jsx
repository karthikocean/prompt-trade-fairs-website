import React, { useState, useEffect } from "react";
import { 
  getCategories, 
  getProducts, 
  getAvailableStalls, 
  createStallEnquiry,
  createVisitorEnquiry,
  createInterestEnquiry,
  createContactEnquiry
} from "../api/common.api";
import toast from "react-hot-toast";

const EnquiryForm = ({ 
  isExpoRegistration = false,
  expoInfo = null,
  onClose = () => {},
  isSimplified = false,
  hideHeader = false,
  customClass = ""
}) => {
  const [enquiryType, setEnquiryType] = useState("stalls"); // "stalls" or "visitors"
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [availableStalls, setAvailableStalls] = useState([]);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const handleProductToggle = (productId) => {
    setFormData(prev => {
      const products = prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId];
      return { ...prev, products };
    });
    if (errors.products) setErrors(prev => ({ ...prev, products: "" }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProductDropdownOpen && !event.target.closest('.product-dropdown-container')) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductDropdownOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    mobileNo: "",
    category: "",
    stallNo: "",
    stallType: "",
    sqm: "",
    totalAmount: "",
    products: [],
    address: "",
    remark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    // Fetch Categories on Mount
    const fetchMasterData = async () => {
      try {
        const catRes = await getCategories();
        if (catRes.data && Array.isArray(catRes.data.data)) {
          setCategories(catRes.data.data);
        }

        if (isExpoRegistration && expoInfo?._id) {
          const stallRes = await getAvailableStalls(expoInfo._id);
          // NEW: Map from data.data.stalls based on provided API structure
          if (stallRes.data && stallRes.data.data && Array.isArray(stallRes.data.data.stalls)) {
            setAvailableStalls(stallRes.data.data.stalls);
          }
        }
      } catch (error) {
        console.error("Error fetching master data:", error);
      }
    };
    fetchMasterData();
  }, [isExpoRegistration, expoInfo?._id]);

  useEffect(() => {
    // Fetch Products when Category changes
    if (formData.category) {
      const fetchProducts = async () => {
        try {
          const prodRes = await getProducts(formData.category);
          if (prodRes.data && Array.isArray(prodRes.data.data)) {
            setProductsList(prodRes.data.data);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    } else {
      setProductsList([]);
    }
  }, [formData.category]);

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

    // VALIDATION: Pincode only numbers and max 6 digits
    if (name === "pincode") {
      if (!/^\d*$/.test(value) || value.length > 6) return;
    }

    // Special handling for products (array)
    if (name === "products") {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, products: selectedOptions }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "stallNo") {
      const selectedStall = availableStalls.find(s => s.stallNo === value);
      if (selectedStall) {
        setFormData(prev => ({
          ...prev,
          stallNo: value, 
          sqm: selectedStall.sqm,
          totalAmount: selectedStall.value,
          stallType: selectedStall.type?._id 
        }));
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (formData.mobileNo.length !== 10) {
      newErrors.mobileNo = "Mobile Number must be 10 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is invalid";
    }

    if (!isSimplified && enquiryType === "stalls") {
      if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (formData.products.length === 0) newErrors.products = "Select at least one product";
      if (!formData.stallNo) newErrors.stallNo = "Stall Selection is required";
    }

    // Remark/Message is mandatory (Common for all types)
    if (!formData.remark || !formData.remark.trim()) {
      newErrors.remark = "Remark / Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isSimplified) {
        if (expoInfo?._id) {
          // Interest Enquiry Payload (as requested by user)
          const payload = {
            expoId: expoInfo._id,
            name: formData.name,
            phone: formData.mobileNo,
            email: formData.email,
            message: formData.remark || `Interested in ${expoInfo.expoName}`
          };
          await createInterestEnquiry(payload);
        } else {
          // Standard Contact Page Payload
          const payload = {
            name: formData.name,
            phone: formData.mobileNo,
            email: formData.email,
            message: formData.remark
          };
          await createContactEnquiry(payload);
        }
      } else if (enquiryType === "visitors") {
        // Visitor Registration Payload
        const payload = {
          expoId: expoInfo?._id,
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          companyName: formData.companyName,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          products: formData.products, // Send array of product IDs
          remark: formData.remark
        };
        await createVisitorEnquiry(payload);
      } else {
        // Stall Enquiry Payload
        const payload = {
          ...formData,
          expoId: expoInfo?._id,
        };
        await createStallEnquiry(payload);
      }

      toast.success("Enquiry Submitted Successfully!");
      
      // RESET FORM
      setFormData({
        name: "",
        email: "",
        companyName: "",
        mobileNo: "",
        category: "",
        stallNo: "",
        stallType: "",
        sqm: "",
        totalAmount: "",
        products: [],
        address: "",
        remark: "",
        city: "",
        state: "",
        pincode: "",
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
      overflow: 'hidden', 
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
        <div className="enquiry-type-selector" style={{ display: 'flex', gap: '20px', padding: '15px 25px', background: '#fcfcfc', borderBottom: '1px solid #eee' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: enquiryType === "stalls" ? '#ED1C24' : '#555' }}>
            <input type="radio" name="enquiryType" value="stalls" checked={enquiryType === "stalls"} onChange={() => setEnquiryType("stalls")} />
            <span>Stall Enquiry</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: enquiryType === "visitors" ? '#ED1C24' : '#555' }}>
            <input type="radio" name="enquiryType" value="visitors" checked={enquiryType === "visitors"} onChange={() => setEnquiryType("visitors")} />
            <span>Visitor Registration</span>
          </label>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        <div className={`scrollable-fields-container ${customClass}`} style={{ 
          padding: hideHeader ? '0' : '25px', 
          overflowY: hideHeader ? 'visible' : 'auto', 
          flexGrow: 1,
        }}>
          {enquiryType === "stalls" || isSimplified ? (
            <div className="stall-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label style={labelStyle}>Name *</label>
                <input style={{...inputStyle, borderColor: errors.name ? '#ED1C24' : '#e2e8f0'}} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Company Name *</label>
                <input style={{...inputStyle, borderColor: errors.companyName ? '#ED1C24' : '#e2e8f0'}} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company" />
                {errors.companyName && <span style={errorTextStyle}>{errors.companyName}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Mobile Number *</label>
                <input style={{...inputStyle, borderColor: errors.mobileNo ? '#ED1C24' : '#e2e8f0'}} type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter 10-digit Mobile" maxLength="10" />
                {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Email *</label>
                <input style={{...inputStyle, borderColor: errors.email ? '#ED1C24' : '#e2e8f0'}} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
              </div>

              {!isSimplified && (
                <>
                  <div className="form-group">
                    <label style={labelStyle}>Category *</label>
                    <select style={{...inputStyle, borderColor: errors.category ? '#ED1C24' : '#e2e8f0'}} name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Select Category</option>
                      {Array.isArray(categories) && categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                    {errors.category && <span style={errorTextStyle}>{errors.category}</span>}
                  </div>
                  <div className="form-group product-dropdown-container" style={{ position: 'relative' }}>
                    <label style={labelStyle}>Products *</label>
                    <div 
                      onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderColor: errors.products ? '#ED1C24' : '#e2e8f0',
                        minHeight: '45px',
                      }}
                    >
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: formData.products.length ? '#333' : '#999',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '90%'
                      }}>
                        {formData.products.length 
                          ? productsList
                              .filter(p => formData.products.includes(p._id))
                              .map(p => p.productName)
                              .join(', ')
                          : "Select Products"}
                      </span>
                      <i className={`fas fa-chevron-${isProductDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px', color: '#666' }}></i>
                    </div>

                    {isProductDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        marginTop: '5px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        zIndex: 100,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        padding: '10px'
                      }}>
                        {Array.isArray(productsList) && productsList.length > 0 ? (
                          productsList.map(prod => (
                            <label 
                              key={prod._id} 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px', 
                                padding: '8px 10px', 
                                cursor: 'pointer', 
                                fontSize: '0.85rem', 
                                borderRadius: '6px', 
                                transition: '0.2s',
                                color: '#4b5563' 
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <input 
                                type="checkbox" 
                                checked={formData.products.includes(prod._id)} 
                                onChange={() => handleProductToggle(prod._id)}
                                style={{ accentColor: '#ED1C24', width: '16px', height: '16px' }}
                              />
                              {prod.productName}
                            </label>
                          ))
                        ) : (
                          <p style={{ fontSize: '0.8rem', color: '#999', margin: 0, textAlign: 'center', padding: '10px' }}>
                            {formData.category ? "No products found" : "Select a category first"}
                          </p>
                        )}
                      </div>
                    )}
                    {errors.products && <span style={errorTextStyle}>{errors.products}</span>}
                  </div>
                  <div className="form-group">
                    <label style={labelStyle}>Select Stall *</label>
                    <select style={{...inputStyle, borderColor: errors.stallNo ? '#ED1C24' : '#e2e8f0'}} name="stallNo" value={formData.stallNo} onChange={handleChange}>
                      <option value="">Select Stall</option>
                      {Array.isArray(availableStalls) && availableStalls.map(stall => <option key={stall._id} value={stall.stallNo}>{stall.stallNo} ({stall.sqm} sqm)</option>)}
                    </select>
                    {errors.stallNo && <span style={errorTextStyle}>{errors.stallNo}</span>}
                  </div>
                  <div className="form-group">
                    <label style={labelStyle}>Stall Type</label>
                    <input 
                      style={{...inputStyle, background: '#f9fafb'}} 
                      type="text" 
                      value={availableStalls.find(s => s.stallNo === formData.stallNo)?.type?.stallTypeName || ""} 
                      readOnly 
                    />
                  </div>
                  <div className="form-group"><label style={labelStyle}>Sqm</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" value={formData.sqm} readOnly /></div>
                  <div className="form-group"><label style={labelStyle}>Total Amount</label><input style={{...inputStyle, background: '#f9fafb'}} type="text" value={formData.totalAmount} readOnly /></div>
                  
                  <div className="form-group" style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Address</label><textarea style={textareaStyle} name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address"></textarea></div>
                  <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <div className="form-group"><label style={labelStyle}>City</label><input style={inputStyle} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" /></div>
                    <div className="form-group"><label style={labelStyle}>State</label><input style={inputStyle} type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" /></div>
                    <div className="form-group"><label style={labelStyle}>Pincode</label><input style={inputStyle} type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" /></div>
                  </div>
                </>
              )}
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Remark / Message *</label>
                <textarea 
                  style={{...textareaStyle, borderColor: errors.remark ? '#ED1C24' : '#e2e8f0'}} 
                  name="remark" 
                  value={formData.remark} 
                  onChange={handleChange} 
                  placeholder="Enter your requirement"
                ></textarea>
                {errors.remark && <span style={errorTextStyle}>{errors.remark}</span>}
              </div>
            </div>
          ) : (
            <div className="visitor-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label style={labelStyle}>Name *</label>
                <input style={{...inputStyle, borderColor: errors.name ? '#ED1C24' : '#e2e8f0'}} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Mobile *</label>
                <input style={{...inputStyle, borderColor: errors.mobileNo ? '#ED1C24' : '#e2e8f0'}} type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="10-digit number" maxLength="10" />
                {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Email *</label>
                <input style={{...inputStyle, borderColor: errors.email ? '#ED1C24' : '#e2e8f0'}} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label style={labelStyle}>Company Name</label>
                <input style={inputStyle} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Optional" />
              </div>

              <div className="form-group"><label style={labelStyle}>City</label><input style={inputStyle} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" /></div>
              <div className="form-group"><label style={labelStyle}>State</label><input style={inputStyle} type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" /></div>
              <div className="form-group"><label style={labelStyle}>Pincode</label><input style={inputStyle} type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" /></div>
              
              <div className="form-group">
                <label style={labelStyle}>Category</label>
                <select style={inputStyle} name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>

              <div className="form-group product-dropdown-container" style={{ position: 'relative', gridColumn: 'span 2' }}>
                <label style={labelStyle}>Products of Interest *</label>
                <div 
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  style={{
                    ...inputStyle,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: errors.products ? '#ED1C24' : '#e2e8f0',
                    minHeight: '45px',
                  }}
                >
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: formData.products.length ? '#333' : '#999',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '90%'
                  }}>
                    {formData.products.length 
                      ? productsList
                          .filter(p => formData.products.includes(p._id))
                          .map(p => p.productName)
                          .join(', ')
                      : "Select Products"}
                  </span>
                  <i className={`fas fa-chevron-${isProductDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px', color: '#666' }}></i>
                </div>

                {isProductDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%', // Open upwards if it's at the bottom of the form
                    left: 0,
                    width: '100%',
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    marginBottom: '5px',
                    boxShadow: '0 -10px 25px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    padding: '10px'
                  }}>
                    {Array.isArray(productsList) && productsList.length > 0 ? (
                      productsList.map(prod => (
                        <label 
                          key={prod._id} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            padding: '8px 10px', 
                            cursor: 'pointer', 
                            fontSize: '0.85rem', 
                            borderRadius: '6px', 
                            transition: '0.2s',
                            color: '#4b5563' 
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <input 
                            type="checkbox" 
                            checked={formData.products.includes(prod._id)} 
                            onChange={() => handleProductToggle(prod._id)}
                            style={{ accentColor: '#ED1C24', width: '16px', height: '16px' }}
                          />
                          {prod.productName}
                        </label>
                      ))
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: '#999', margin: 0, textAlign: 'center', padding: '10px' }}>
                        {formData.category ? "No products found" : "Select a category first"}
                      </p>
                    )}
                  </div>
                )}
                {errors.products && <span style={errorTextStyle}>{errors.products}</span>}
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Remark *</label>
                <textarea 
                  style={{...textareaStyle, borderColor: errors.remark ? '#ED1C24' : '#e2e8f0'}} 
                  name="remark" 
                  value={formData.remark} 
                  onChange={handleChange} 
                  placeholder="Additional notes..."
                ></textarea>
                {errors.remark && <span style={errorTextStyle}>{errors.remark}</span>}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions-screenshot" style={{ padding: '20px 25px', borderTop: '1px solid #e5e7eb', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#fff' }}>
          <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <button type="submit" disabled={isSubmitting} style={{...saveBtnStyle, opacity: isSubmitting ? 0.7 : 1}}>
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

const labelStyle = { fontSize: '0.85rem', fontWeight: '700', color: '#4b5563', marginBottom: '6px', display: 'block' };
const inputStyle = { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#f8fafc', transition: '0.3s' };
const textareaStyle = { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem', minHeight: '100px', boxSizing: 'border-box', background: '#f8fafc', transition: '0.3s' };
const cancelBtnStyle = { padding: '12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' };
const saveBtnStyle = { padding: '12px', background: '#ed1c24', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer', transition: '0.3s' };
const errorTextStyle = { color: '#ED1C24', fontSize: '0.7rem', marginTop: '4px', display: 'block', fontWeight: '600' };

export default EnquiryForm;
