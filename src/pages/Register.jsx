import React from 'react';
import { mockData } from '../mockData';
import logo from "../assets/logo.png";

function Register() {
    const user = mockData.currentUser;

    return (
        <div className="page form-container">
            <img className="image" src={logo} alt="" />
                        <h1 className="heading">Sindh Smart Citizen Portal</h1>
                        <h2 className="heading">Create Account</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder='e.g. Jane Doe' />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder='e.g. janedoe@gmail.com' />
                </div>
                 <div className="form-group">
                                    <label>CNIC Number</label>
                                        <input
                                        type="text"
                                        maxLength="15"
                                        pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                                        placeholder="XXXXX-XXXXXXX-X"
                                        
                                        />
                                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder='+92' />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea placeholder='Enter your residential address'></textarea>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Re-enter password" />
                    </div>
                    <div className="form-group terms">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    I agree to the <a href="/terms">terms and conditions</a>
                                </label>
                                </div>
                    <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
