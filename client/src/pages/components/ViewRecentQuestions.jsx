import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../expertAnalysis.css';

const ViewRecentQuestions = () => {
    const [recentquestions, setrecentQuestions] = useState([]);
    const [error, setError] = useState('');
    const [visibleAnswers, setVisibleAnswers] = useState({}); // State to track visible answers

    useEffect(() => {
        const fetchrecentQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/expertanalysis/recentquestions`);
                console.log(response.data); // Debug response
                setrecentQuestions(response.data);
            } catch (error) {
                setError('Error in retrieving recent questions');
                console.log(error);
            }
        };
        fetchrecentQuestions();
    }, []);

    const toggleAnswer = (answerId) => {
        setVisibleAnswers((prevState) => ({
            ...prevState,
            [answerId]: !prevState[answerId], // Toggle the visibility state
        }));
    };

    return (
        <div>
            <h2>Recently Asked Questions</h2>
            {recentquestions.length > 0 ? (
                recentquestions.map((question, index) => (
                    <div className="question-item" key={index}>
                        <div className="content">
                            <h3>{question.question}</h3>
                            <p style={{ color:"slategray"}}>Asked by: {question.name}</p>
                            {question.answers && question.answers.length > 0 ? (
                                question.answers.map((ans, ansIndex) => {
                                    const answerId = `answer${index}-${ansIndex}`;
                                    return (
                                        <div key={ansIndex}>
                                            <p>
                                                <button
                                                    onClick={() => toggleAnswer(answerId)}
                                                >
                                                    {visibleAnswers[answerId]
                                                        ? 'Hide Answer'
                                                        : 'View Answer'}
                                                </button>
                                            </p>
                                            <p
                                                id={answerId}
                                                className="answer"
                                                style={{
                                                    display: visibleAnswers[answerId]
                                                        ? 'block'
                                                        : 'none',
                                                }}
                                            >
                                                {ans.answertext}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No answers available</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No recent questions available</p>
            )}
        </div>
    );
};

export default ViewRecentQuestions;
