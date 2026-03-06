import React from 'react';
import { mockData } from '../mockData';

function Login() {
    return (
        <div className="page form-container">
            <h2>Login to SSCP</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={mockData.currentUser.email} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" defaultValue="password123" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default Login;
