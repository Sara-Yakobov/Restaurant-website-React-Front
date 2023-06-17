import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import Menu from "./Menu";
import picture from "./image/KARELA-09140.jpg";
import './App.css';


function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://apiproject3.braveocean-96b61207.swedencentral.azurecontainerapps.io/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleClick = () => {
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home handleClick={handleClick} />} />
          <Route path="/category/:id" element={<Menu categories={categories}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

function Home({ handleClick }) {
  return (
    <div className="main">
      <div className="text">
        <h1>ברוכים הבאים למסעדת קפה קפה</h1>
        <Button variant="contained" color="primary" sx={{ height: 60, width: 200 }} onClick={handleClick}>
          <Link style={{ fontSize: "1.5rem", fontFamily: "Arial, sans-serif" }} to="/category/:id">לתפריט לחץ כאן</Link>
        </Button>
      </div>
      <img src={picture} alt="תמונה" className="image" />
    </div>
  );
}

export default App;
