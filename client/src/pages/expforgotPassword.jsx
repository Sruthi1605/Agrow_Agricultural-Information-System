import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.jpg';
import './Login.module.css';
import { Link } from 'react-router-dom'; 
function ExpForgotPassword() {
    const [identifier, setIdentifier] = useState('');  // Can be username or email
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const bk={
        backgroundColor: '#ffffff', /* White background for the login form */
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '350px', /* Adjust the form width */
        textAlign: 'center',
        marginTop: '200px',
        marginLeft:'550px'
   }
   const foot={
    display:'flex',
    justifyContent:'spaceBetween',
   
   }
   const foot_btn={
    
    textDecoration:'none',
    cursor:'pointer',
    color:'white'
   }
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/auth/expforgotPassword", { 
                identifier, 
                newPassword 
            });
            setMessage(response.data.message || 'Password reset successful. You can now log in.');
            setError('');
        } catch (e) {
            setError(e.response?.data?.message || 'Failed to reset password. Please try again.');
        }
    };

    return (
        <>
        <header>
                <p><img src={logo} alt='My Agro Logo'/></p>
                <h1>AGROW</h1>
            </header>
            <div id="login" style={bk}> 
            <h2>Reset Password</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleResetPassword}>
                <label>Username or Email</label>
                <input
                    type="text"
                    value={identifier}
                    required
                    placeholder="Enter your username or email"
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    required
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
                </form>
                <div id="back" style={foot}>
                <button ><Link to="/explogin" style={foot_btn}>Login</Link></button>
                <button ><Link to="/expsignup"style={foot_btn}>Sign Up</Link></button>
                </div>
            
        </div>
        </>
    );
}
export default ExpForgotPassword;