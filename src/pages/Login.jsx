import React from 'react';
import { mockData } from '../mockData';
import logo from "../assets/logo.png";

function Login() {
    return (
        <div className=" page form-container">
            <img className="image" src={logo} alt="" />
            <h1 className="heading">Sindh Smart Citizen Portal</h1>
            <h2 className="heading">Login</h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>CNIC Number</label>
                        <input
                        type="text"
                        maxLength="15"
                        pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                        placeholder="XXXXX-XXXXXXX-X"
                        defaultValue={mockData.currentUser.cnic}
                        required
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="********" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default Login;
