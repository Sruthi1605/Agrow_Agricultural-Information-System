import './Login.module.css';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import logo from './assets/logo.jpg';  // Ensure you have the correct path for the logo
//import agriBackground from './agri.png'; // Ensure you have the correct path for the background image

function ExpLogin() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
   const bk={
   
        backgroundColor: '#ffffff', /* White background for the login form */
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '350px', /* Adjust the form width */
        textAlign: 'center',
       marginTop: '200px',
        marginLeft: '550px'
   }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all the fields');
            return;
        }
        setError('');
        try {
            await axios.post("http://localhost:3001/api/auth/explogin", { username, password });
            localStorage.setItem("isAuthenticated", true);
            navigate('/expertanswer'); 
        } catch (e) {
            setError(e.response?.data?.message || 'Login failed. Please try again.');
            console.log(e);
        }
        console.log('Logging in with:', { username, password });
        setPassword('');
        setUsername('');
    };

    return (
        <>
            <header>
                <img src={logo} alt="AGROW Logo" />
                <h1>AGROW</h1>
               
            </header>
            <div id="block">
                <div id="login" style={bk}>
                    <div id="heading"><h2>LOGIN</h2></div>
                    <div id="inLogin">
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                required 
                                placeholder="Abc" 
                                onChange={(e) => { setUsername(e.target.value); }} 
                            />
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                required 
                                onChange={(e) => { setPassword(e.target.value); }} 
                            />
                            <input type="submit" value="LOGIN" />
                        </form>
                        <div className="footer">
                            <p><Link to="/expforgotPassword">Forget password?</Link></p>
                            <p>Don't have an account? <b><Link to="/expsignup">Sign Up</Link></b></p>
                        </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default ExpLogin;
