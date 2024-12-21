import React, { useState } from 'react';
import axios from 'axios';
import './PriceUpdates.css'; // Import the CSS file
import logo from './assets/logo.jpg'

const PriceUpdates = () => {
    const [formData, setFormData] = useState({
        priceType: '0',
        commodity: '',
        state: 'Tamil Nadu',
        
        
    });

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/price/priceupdates', formData);
            setResult(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="price-updates-container">
            <header className="price-updates-header">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Agri Data Search</h1>
            </header>
            <form className="price-updates-form" onSubmit={handleSubmit}>
                <label>
                    Price/Arrivals:
                    <select name="priceType" value={formData.priceType} onChange={handleChange} className="input-field">
                        <option value="0">Price</option>
                        <option value="1">Arrival</option>
                        <option value="2">Both</option>
                    </select>
                </label>
                <label>
                    Commodity:
                    <input type="text" name="commodity" value={formData.commodity} onChange={handleChange} className="input-field" />
                </label>
                <label>
                    State:
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" />
                </label>
                {/* <label>
                    District:
                    <input type="text" name="district" value={formData.district} onChange={handleChange} className="input-field" />
                </label> */}
                {/* <label>
                    Date From:
                    <input type="date" name="dateFrom" value={formData.dateFrom} onChange={handleChange} className="input-field" />
                </label>
                <label>
                    Date To:
                    <input type="date" name="dateTo" value={formData.dateTo} onChange={handleChange} className="input-field" />
                </label> */}
                <button type="submit" className="submit-button">Search</button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                result.length > 0 && (
                    <table className="price-updates-table">
                        <thead>
                            <tr>
                                <th>Sl no.</th>
                                <th>District Name</th>
                                <th>Market Name</th>
                                <th>Commodity</th>
                                <th>Variety</th>
                                <th>Grade</th>
                                <th>Min Price (Rs./Quintal)</th>
                                <th>Max Price (Rs./Quintal)</th>
                                <th>Modal Price (Rs./Quintal)</th>
                                <th>Price Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default PriceUpdates;
