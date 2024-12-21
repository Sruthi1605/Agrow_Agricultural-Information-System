import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('name');  // Get the user's name from localStorage

        if (!name) {
            setError('User is not logged in');
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/expertanalysis/questions`, { params: { name } });
                setQuestions(response.data);  // Store questions in state
            } catch (err) {
                setError('Error in retrieving questions');
                console.log(err);
            }
        };

        fetchQuestions();
    }, []);  // Empty dependency array ensures this runs once when the component mounts

    return (
        <div>
            {error && <p>{error}</p>}
            <h3>Your Questions</h3>
            {questions.length === 0 ? (
                <p style = {{ color: "green" }}>No questions found for the user.</p>
            ) : (
                <ul>
                    {questions.map((q, index) => (
                        <li key={index}>
                            <h4>{q.question}</h4>
                            {/* <p>Asked by: {q.name}</p> */}
                            <h5>Answers:</h5>
                            <ul>
                                {q.answers && q.answers.length > 0 ? (
                                    q.answers.map((answer, index) => (
                                        <li key={index}>
                                            <p>{answer.answertext}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p style={{color:"slategray"}}>No answers yet.</p>
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewQuestions;
