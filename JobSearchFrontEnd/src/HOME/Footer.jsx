import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div>
        <div className='job-home-footer-list'>
            <div className='job-home-footer-options'>
              <h2>JobFinder</h2>
              <ul>
                <p>Collin Street West,Victor,Australia</p>
                <p>+916664446660</p>
                <p>info@jobfinder.com</p>
                </ul>
            </div>
            <div className='job-home-footer-options'>
              <h2>About Us</h2>
              <ul>
                <li>Product</li>
                <li>Terms & Policies</li>
                <li>FAQ's</li>
                <li>Job Packages</li>
              </ul>
        </div>
        <div className='job-home-footer-options'>
          <h2>Follow Us</h2>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className='job-home-footer-options'>
          <h2>Still Need Help?</h2>
          <p>Let us know about your issue and a professional will reach you out</p>
          <input placeholder='Enter Valid Email Address'></input>
          {/* <button>Send</button>  */}
    </div>
    </div>
    </div>
  )
}

export default Footer
