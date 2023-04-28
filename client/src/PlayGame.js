import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuizQuestions, getQuestionAnswers } from './api';
import style from './PlayGame.module.css';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
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

  const handleSelectedAnswer = (answerId) => {
    setSelectedAnswer(answerId);
    setShowNextButton(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/quizzes/${quizId}/score`);
  };

  return (
    <div className={style.game_menu}>
      <h1 className={style.heading}>{`Question ${
        currentQuestionIndex + 1
      }`}</h1>
      <div className={style.question}>
        <h2 className={style.question_text}>
          {currentQuestion ? currentQuestion.question_text : ''}
        </h2>
        <img
          src={currentQuestion?.image_url}
          className={style.images}
          alt=''
        ></img>
        {currentQuestion?.audio_url && (
          <audio src={currentQuestion.audio_url} controls></audio>
        )}
      </div>
      <ul className={style.answers_unordered_list}>
        {questions[currentQuestionIndex]?.answers.map((answer) => {
          return (
            <li key={answer.answer_id} className={style.answers_list_item}>
              <button
                className={`${style.answers_button} ${
                  selectedAnswer === answer.answer_id && style.selected_answer
                }`}
                onClick={() => handleSelectedAnswer(answer.answer_id)}
              >
                {answer.answer_text}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <Link to='/game/new'>
          <button className={style.button}>Main Menu</button>
        </Link>
        {/* <button
          className={style.button}
          onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button> */}
        {showNextButton && (
          <button
            className={style.button}
            onClick={() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayGame;
