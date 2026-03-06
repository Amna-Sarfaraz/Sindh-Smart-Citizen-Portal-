import React from 'react';
import { mockData } from '../mockData';
import logo from "../assets/logo.png";

function Login() {
    return (
        <div className="page max-w-[450px] mx-auto my-[2rem] p-[2.5rem] text-white rounded-[12px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] bg-[linear-gradient(135deg,#2d4164,#5979ad)]">

            <img className="w-[150px] h-[150px] rounded-full block mx-auto mb-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.1) border border-[#bfdbfe]" src={logo} alt="" />

            <h1 className="heading text-center font-[Georgia,'Times New Roman',Times,serif] text-[24px] font-bold">Sindh Smart Citizen Portal</h1>
            <h2 className="heading text-center font-[Georgia,'Times New Roman',Times,serif] text-[20px] font-bold">Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group mb-[2.25rem]">
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
                <div className="form-group mb-[2.25rem]">
                    <label>Password</label>
                    <input type="password" placeholder="********" />
                </div>
                <button type="submit" className="w-full p-[0.75rem] bg-[var(--primary)] text-white border-0 rounded-[6px] font-[600] cursor-pointer transition-[background] duration-200">Login</button>
            </form>
            <p className="text-white">Don't have an account?{' '}<a href="/register" className="underline text-purple-200">Register here</a></p>
        </div>
    );
}

export default Login;
