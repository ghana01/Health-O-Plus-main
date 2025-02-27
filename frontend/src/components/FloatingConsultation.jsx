import React, { useState } from "react";
import "./FloatingConsultation.css"; // Import CSS for styling

const FloatingConsultation = () => {
    console.log("FloatingConsultation Loaded");

    // List of cities
    const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Kolkata", "Hyderabad", "Pune"];

    return (
        <div className="floating-consultation">
            <div className="consultation-form">
                <h3>Book your consultation today</h3>

                {/* City Dropdown */}
                <select>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>

                {/* Ailment Dropdown */}
                <select>
                    <option>Select Ailment*</option>
                    <option>Fever</option>
                    <option>Cold & Flu</option>
                    <option>Headache</option>
                    <option>Stomach Pain</option>
                </select>

                {/* Name Input */}
                <input type="text" placeholder="Name*" required />

                {/* Contact Number Input */}
                <input type="tel" placeholder="Contact Number*" required />

                {/* Submit Button */}
                <button className="submit-btn">Book Appointment</button>
            </div>
        </div>
    );
};

export default FloatingConsultation;
