import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions? We'd love to hear from you</p>
      </div>

     <div className="contact-cards">
        {/* Email Card */}
        <div className="contact-card">
          <div className="icon email">
            <Mail size={30} />
          </div>
          <h3>Email Us</h3>
          <p className="highlight">infoagromart@gmail.com</p>
        </div>

        {/* Call Card */}
        <div className="contact-card">
          <div className="icon phone">
            <Phone size={30} />
          </div>
          <h3>Call Us</h3>
          <p className="highlight">+91 9689858687</p>
        </div>

         <div className="contact-card">
          <div className="icon phone">
          <MapPin size={30}/>
          </div>
          <h3>Our Location</h3>
          <p className="highlight">SVVV, Indore, Madhya Pradesh, India</p>
        </div>

        {/* Working Hours Card */}
        <div className="contact-card">
          <div className="icon clock">
            <MessageCircle size={30}/>
          </div>
          <Link to ="contactform" ><h3>Mesage Here..</h3></Link>
          <p>24/7 - Always Available</p>
        </div>
      </div>
    </div>
  );
}