import React, { useState } from "react";
import "./expertAnalysis.css";
import ViewQuestions from "./components/ViewQuestions.jsx";
import ViewRecentQuestions from "./components/ViewRecentQuestions.jsx";
import axios from "axios";

const ExpertAnalysis = () => {
  const [activeSection, setActiveSection] = useState("ask"); 
  //const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };
  const submitQuestion = async (e) => {
    e.preventDefault();
    if ( !question) {
      setError("Please fill all the fields");
      setTimeout(() => setError(''), 1000);
      return;
    }
    //alert("Your question has been submitted!");
    try {
      const name = localStorage.getItem("name");
      //console.log(uname)
      await axios.post("http://localhost:3001/api/expertanalysis/addquestion", { name, question });
      console.log("question added susscessfully")
      setSuccess("Question is Added successfully");
      setTimeout(() => setSuccess(''), 1000);
    }
    catch (e) {
      setError(e.response?.data?.message || 'Error in adding question');
      console.log(e);
    }
     
    setQuestion(""); 
  };

  

  return (
    <div className="app-container">
      {/* Header */}
      <header className="expertheader">
        <h1>Expert Analysis</h1>
        <p>Connecting farmers with agriculture experts</p>
      

      {/* Navigation */}
      <nav className="expertnav">
        <button onClick={() => showSection("home")}>Home</button>
        <button onClick={() => showSection("ask")}>Ask a Question</button>
        <button onClick={() => showSection("browse")}>Browse Questions</button>
      </nav>
      </header>
      {/* Main Content */}
      <main className="main">
        {activeSection === "home" && (
          <section id="home-content">
            {/* Empty Home Content */}
            <ViewQuestions/>
          </section>
        )}

        {activeSection === "ask" && (
          <form id="ask-content" className="ask-form">
            
            <h2>Ask an Expert</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            
            <textarea
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <button onClick={submitQuestion}>Submit Question</button>
          </form>
        )}

        {activeSection === "browse" && (
          <section id="browse-content" className="recent-questions">
            <ViewRecentQuestions/>
          </section>
        )}
      </main>
    </div>
  );
};

export default ExpertAnalysis;
