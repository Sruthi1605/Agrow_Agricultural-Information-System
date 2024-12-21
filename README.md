# AGROW - Agricultural Information System

## Overview  
**AGROW** is a cutting-edge platform developed to empower farmers by delivering real-time, critical information for modern agriculture. The system seamlessly integrates weather updates, market prices, expert consultations, and government scheme details into a single, intuitive platform, simplifying decision-making and enhancing productivity in the agricultural sector.

## Features  
- **Weather Updates**: Reliable and precise weather forecasts to aid farmers in planning their activities effectively.  
- **Market Price Updates**: Live updates on commodity prices to help farmers make well-informed selling decisions.  
- **Expert Advice**: Access to agricultural professionals for resolving queries and learning best practices.  
- **Government Schemes**: Comprehensive information on relevant schemes and subsidies tailored for farmers.

## Technologies Used  
- **Frontend**: HTML, CSS, JavaScript, React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  

## **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/RvRagav/Agricultural-Information-System.git
   cd Agricultural-Information-System
   ```
2. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```
3. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```
4. Set up the environment variables:
   - Create a `.env` file in the `server` directory and add:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     PORT=your_server_port
     ```
5. Start the backend server:
   ```bash
   cd ../server
   npm run dev
   ```
6. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```


## **Usage**
1. Navigate to the application in your web browser: `http://localhost:<3000>`.
2. Sign up or log in as a farmer to access features.
3. Explore real-time weather updates, market prices, and more from the dashboard.
