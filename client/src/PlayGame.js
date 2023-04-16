import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuizQuestions, getQuestionAnswers } from './api';
import style from './PlayGame.module.css';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuizQuestions(quizId);
      const questionAnswers = await Promise.all(
        questionsData.map(async (question) => {
          const answers = await getQuestionAnswers(question.question_id);
          return {
            ...question,
            answers,
          };
        })
      );
      setQuestions(questionAnswers);
    };
    fetchData();
  }, [quizId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      selectedAnswer: answerId,
    };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/quizzes/${quizId}/score`);
  };

  return (
    <div>
      <h1>{`Question ${currentQuestionIndex + 1}`}</h1>
      <h2>{currentQuestion ? currentQuestion.question_text : ''}</h2>
      <ul>
        {questions[currentQuestionIndex]?.answers.map((answer) => {
          return (
            <li key={answer.answer_id}>
              <button onClick={() => handleAnswerSelect(answer.answer_id)}>
                {answer.answer_text}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }}
        disabled={currentQuestionIndex === 0}
      >
        Back
      </button>
      <button
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        Next
      </button>
      <Link to='/game/new'>
        <button>Main Menu</button>
      </Link>
    </div>
  );
};

export default PlayGame;
