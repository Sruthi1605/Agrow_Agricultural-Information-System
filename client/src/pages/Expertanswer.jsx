import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Expertanswer.css";

const ExpertAnswer = () => {
  const [recentquestions, setrecentQuestions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [error, setError] = useState('');

  // Fetch recentquestions from the database
  useEffect(() => {
    const fetchrecentQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expertanalysis/recentquestions`);
        console.log(response.data); // Debug response
        setrecentQuestions(response.data);
      } catch (error) {
        setError('Error in retrieving recent recentquestions');
        console.log(error);
      }
    };
    fetchrecentQuestions();
  }, []);

  // Update the current answer for a specific question
  const handleAnswerChange = (qid, value) => {
    setCurrentAnswer((prev) => ({ ...prev, [qid]: value }));
  };

  // Submit an answer to the database
  const submitAnswer = async (qid) => {
    const answer = currentAnswer[qid]?.trim();
    if (answer) {
      try {
        const response = await axios.put(`http://localhost:3001/api/expertanalysis/addanswer/${qid}`, { answertext: answer });
        if (response.status === 200) {
          setrecentQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
              q._id === qid
                ? { ...q, answers: [...q.answers, { answertext: answer }] }
                : q
            )
          );
          setCurrentAnswer((prev) => ({ ...prev, [qid]: "" }));
          console.log("answer added successfully")
        } else {
          console.error("Failed to submit answer. Status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };


  return (
    <div className="app-container">
      <header className="answerheader">
        <h1>Expert Analysis</h1>
        <p>Connecting farmers with agricultural experts.</p>
      </header>
      <main className="mainanswer">
        <h2>Frequently Asked Questions</h2>

        <ul>
          {recentquestions.map((q) => (
            <li key={q._id} className="question-item">
              <p>
                <strong>{q.question}</strong> (Asked by: {q.name})
              </p>
              <div className="answers">
                <h4>Answers:</h4>
                <ul>
                  {q.answers.map((answer, index) => (
                    <li key={index}>{answer.answertext}</li> // Render 'answertext' instead of the whole object
                  ))}
                </ul>

                <input
                  type="text"
                  value={currentAnswer[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  placeholder="Add your answer"
                />
                <button onClick={() => submitAnswer(q._id)}>Submit Answer</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ExpertAnswer;
