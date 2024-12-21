import React, { useState, useEffect } from 'react';
import './home.css';
import logo from './assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap'; // Import Dropdown from React Bootstrap
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
    const navigate = useNavigate();
    //localStorage.setItem("isAuthenticated", false);
    useEffect(() => {
        // Check localStorage to persist login state
        const loggedInUser = localStorage.getItem("isAuthenticated");
        if (loggedInUser) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false); // Reset authentication state
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("name");// Clear login state
        navigate("/"); // Navigate to the home page
    };

    return (
        <div >
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Agrow Logo" />
                    <h1>AGROW</h1>
                </a>
                <div className="button-container">
                    {/* Sign In Dropdown */}
                    {isAuthenticated ? (
                        // Show Logout button if authenticated
                        <button
                            className="contact-button"
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginLeft: '10px'
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            {/* Sign In Dropdown */}
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle className="dropdown-toggle">
                                    Login
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <Dropdown.Item as={Link} to="/explogin">Expert</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/login">User</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Sign Up Dropdown */}
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle className="dropdown-toggle">
                                    Sign Up
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <Dropdown.Item as={Link} to="/expsignup">Expert</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/signup">User</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )}

                    {/* Contact Us Button */}
                    <button
                        className="contact-button"
                        onClick={() => (window.location.href = '#contact')}
                        style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginLeft: '10px'
                        }}
                    >
                        Contact Us
                    </button>
                </div>
            </nav>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1>Engage in the Wonder of Nature and Marketing</h1>
                    <p>
                        Empowering farmers with real-time market updates and insights, helping
                        them make informed decisions about agricultural commodity prices.
                    </p>
                    <img
                        src="https://t3.ftcdn.net/jpg/08/04/22/42/360_F_804224219_QdNW7DlskOWvDzon8xM4LQuxX62bdvdm.jpg"
                        alt="Nature"
                        className="hero-image"
                    />
                </div>
            </section>

            {/* Content Section with Boxes */}
            <div className="container my-5">
                <div className="row">
                    <Box title="Current Weather" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhTgrAEB1d8Y-hj0dazJZkxl691NnXOPurw&s" link="/weather" description="Weather forecast to keep your farm operations running smoothly." className="weather-container" />
                    <Box title="Price Updates" image="https://t4.ftcdn.net/jpg/02/75/80/29/240_F_275802937_IisK2QRZpfUXE0tmpHXrX6yO8i4pwiw4.jpg" link="/priceupdates" description="Get the latest updates on commodity prices and market trends." className="price-container" />
                    <Box title="Expert Analysis" image="https://www.project-sherpa.eu/wp-content/uploads/2020/04/fs-Tablet-Agriculture-2018.xl_.jpg" link="/expertAnalysis" description="Get expert advice on farming techniques, pest control, soil management, etc." className="expert-analysis-container" />
                    <Box title="Government Schemes" image="https://www.en.krishakjagat.org/wp-content/uploads/2022/03/51912337899_17d26b6594_k-4.jpg" link="/schemes" description="Discover government initiatives that support farmers and agriculture development." className="gov-scheme-container" />
                </div>
            </div>

            {/* Hot News Section */}
            <div className="hot-news" onClick={() => window.location.href = 'https://krishijagran.com/'}>
                <a href="https://krishijagran.com/">
                    <div className="scrolling-text">Click here to see the hot news we've for you</div>
                </a>
            </div>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <h2><b>What We Provide</b></h2>
                    <p>Agrow empowers farmers to connect with experts, track market trends, and discover top farming techniques. Join us in transforming agriculture for a brighter future!</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footerhome">
                <div className="container d-flex justify-content-between flex-wrap">
                    <div>
                        <h3>Location</h3>
                        <p>Madras Institute of Technology, Tambaram, Chennai</p>
                    </div>
                    <div id="contact">
                        <h3>Contact Us</h3>
                        <p>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZr33hBaSp-Nm1gCeFlgOhDZ5Wb3pnzJEeWA&s" alt="Phone" />
                            +91 6385931581
                        </p>
                        <p>For queries, contact: +91 6385931581, +91 6385932825</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const Box = ({ title, image, link, description, className }) => {
    const navigate = useNavigate();
   
    const handleclick = (title, link) => {
        if (title === "Expert Analysis") {
            // Verify authentication status
            const isAuthenticated = localStorage.getItem("isAuthenticated");
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                navigate("/login");
                return;
            }
        }
        // Navigate to the desired link if authentication is valid or not needed
        navigate(link);
    }

    return (
        <div className="col-md-3">
            <div className={`custom-box ${className}`} onClick={() => handleclick(title, link)} style={{ cursor: 'pointer' }} >
                    <h2>{title}</h2>
                    <img src={image} alt={title} />
                    <p>{description}</p>
            </div>
        </div>
    );
};
export default Home;
