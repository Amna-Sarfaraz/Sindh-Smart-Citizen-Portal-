import React from 'react';
import { mockData } from '../mockData';

function Register() {
    const user = mockData.currentUser;

    return (
        <div className="page form-container">
            <h2>Create Citizen Account</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user.name} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" defaultValue={user.phone} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea defaultValue={user.address}></textarea>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
