import './App.module.css';
import './Login.module.css';
import axios from "axios";
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import logo from './assets/logo.jpg'
function SignUp() {
    const [email, setEmail] = useState('');
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
        marginLeft:'550px'
      
   }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError('Please fill in all the fields');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        try {
            await axios.post("http://localhost:3001/api/auth/signup", { username, email, password });
            navigate("/login");
        } catch (e) {
            setError(e.response?.data?.message || 'Signup failed. Please try again.');
            console.log(e);
        }
        
        console.log('Signing up with:', { username, email, password });
        setEmail('');
        setPassword('');
        setUsername('');
    };

    return (
        <>
            <header>
                <p><img src={logo}/></p>
                <h1>AGROW</h1>
            </header>
            <div className='login-container'>
                <div id="login" style={bk}>
                    <div id="heading"><h2>SIGN UP</h2></div>
                    <div id="inLogin">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Username</label>
                            <input type="text" value={username} required placeholder='Abc' onChange={(e) => { setUsername(e.target.value); }} /><br />
                            <label>Email</label>
                            <input type="email" value={email} required placeholder='abc@gmail.com' onChange={(e) => { setEmail(e.target.value); }} /><br />
                            <label>Password</label>
                            <input type="password" value={password} required onChange={(e) => { setPassword(e.target.value); }} /><br />
                            <input type="submit" value="Sign Up" />
                        </form>
                        <p>Already have an account? <b><Link to="/login">Login</Link></b></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;


