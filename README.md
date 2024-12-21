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

## Installation  

### Clone the repository:  
```bash
git clone https://github.com/RvRagav/Agricultural-Information-System.git
```
cd Agricultural-Information-System

### Install dependencies for the backend:
cd server
npm install

### Install dependencies for the frontend:
cd ../client
npm install

### Configure the environment variables:
Create a .env file in the server directory.

### Add the following details:
MONGO_URI=your_mongodb_connection_string  
PORT=your_server_port  

### Start the backend server:
cd ../server
npm run dev

### Start the frontend development server:
cd ../client
npm start

## Usage
Open your web browser and navigate to the application: http://localhost:<3000>
Sign up or log in as a farmer to access all features.
Use the dashboard to explore real-time weather updates, market prices, expert advice, and more.

