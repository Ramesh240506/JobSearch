import React from 'react'
import './Footer.css'
import {BsSuitcaseLg} from 'react-icons/bs'
import {FaInstagram} from 'react-icons/fa'
import {FaFacebook} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaLinkedin} from 'react-icons/fa'
const Footer = () => {
  return (
    <div>
       <footer className="footer-section">
                <div className="footer-content">
                  <div className="footer-logo">
                    <BsSuitcaseLg />
                    <h2>JobFlow</h2>
                    
                  </div>
                  <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                      <li>About Us</li>
                      <li>Contact Us</li>
                      <li>Privacy Policy</li>
                      <li>Terms of Service</li>
                    </ul>
                  </div>
                  <div className="footer-links">
                    <h3>Resources</h3>
                    <ul>
                      <li>Blog</li>
                      <li>Help Center</li>
                      <li>FAQs</li>
                      <li>Career Advice</li>
                    </ul>
                  </div>
                  <div className="footer-links">
                    <h3>For Employers</h3>
                    <ul>
                      <li>Post a Job</li>
                      <li>Employer Dashboard</li>
                      <li>Pricing Plans</li>
                      <li>Success Stories</li>
                    </ul>
                  </div>
                  <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                      <ul>
                        <li>
                          <FaInstagram />
                        </li>
                        <li>
                          <FaFacebook />
                        </li>
                        <li>
                          <FaLinkedin />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
    </div>
  )
}

export default Footer
