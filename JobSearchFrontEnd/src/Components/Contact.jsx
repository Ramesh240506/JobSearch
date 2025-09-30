import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css'
import { sendFeedBack } from '@/Services/JobService';
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      await sendFeedBack(formData);
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      

      <div className="contact-container">
        <div className="max-width">
          <div className="header">
            <h1>Get In Touch</h1>
            <p>
              Have questions about our job board? We're here to help employers and job seekers connect.
            </p>
          </div>

          <div className="grid">
            <div>
              <div className="card">
                <h2>Send us a message</h2>
                
                {submitted && (
                  <div className="success-message">
                    <CheckCircle color="#16a34a" size={24} />
                    <p>Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`contact-form-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`contact-form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`contact-form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="error-text">{errors.subject}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`contact-form-input ${errors.message ? 'error' : ''}`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>

                <button onClick={handleSubmit} className="submit-btn">
                  <Send size={20} />
                  Send Message
                </button>
              </div>
            </div>

            <div className="contact-info">
              <div className="card">
                <h3>Contact Information</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="contact-item">
                    <div className="icon-box">
                      <Mail color="#2563eb" size={24} />
                    </div>
                    <div className="contact-details">
                      <p>Email</p>
                      <p>support@jobboard.com</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box">
                      <Phone color="#2563eb" size={24} />
                    </div>
                    <div className="contact-details">
                      <p>Phone</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box">
                      <MapPin color="#2563eb" size={24} />
                    </div>
                    <div className="contact-details">
                      <p>Address</p>
                      <p>123 Business Ave, Suite 100<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}