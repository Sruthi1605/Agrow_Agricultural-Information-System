import React, { useEffect, useState } from 'react';
import './SchemePage.css'; // Link to the CSS file
import logo from './assets/logo.jpg'

const SchemesPage = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the schemes from the JSON file or API endpoint

        const fetchSchemes = async () => {
            
            try {
                const response = await fetch('/schemes.json'); // Or your API endpoint: '/schemes'
                if (!response.ok) throw new Error('Failed to fetch schemes');
                const data = await response.json();
                setSchemes(data);
                setLoading(false);
            } catch (err) {
                console.error('[ERROR]', err);
                setError(true);
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    return (
        <div className='schemes-page'>
            <header className='headerscheme'>
                {/* Logo */}
                <img
                    src={logo}
                    alt="Government Schemes for Farmers logo"
                    className="logo"
                />
                <h1 style={{textAlign:"center"}}>Government Schemes for Farmers</h1>
                <div className="nav-buttons">
                    <button onClick={() => (window.location.href = '/')}>Home</button>
                    
                </div>
            </header>

            <div className="content">
                {loading && <p>Loading schemes...</p>}
                {error && <p>Error loading schemes. Please try again later.</p>}
                {!loading && !error && (
                    <div className="scheme-list">
                        {schemes.map((scheme, index) => (
                            <a
                                key={index}
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="scheme-card"
                            >
                                <h3>{scheme.name}</h3>
                                <button aria-label={`Learn more about ${scheme.name}`}>
                                    Learn More
                                </button>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <footer>
                <p>&copy; 2024 Government Schemes for Farmers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SchemesPage;
