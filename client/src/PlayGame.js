import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuizQuestions, getQuestionAnswers } from './api';
import style from './PlayGame.module.css';
import Answers from './Answers';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    score: 0,
  });
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuizProgress = JSON.parse(
      localStorage.getItem(`quiz-${quizId}-progress`)
    );
    if (savedQuizProgress) {
      setQuizProgress(savedQuizProgress);
    } else {
      const fetchData = async () => {
        const questionsData = await getQuizQuestions(quizId);
        const questionAnswers = await Promise.all(
          questionsData.map(async (question) => {
            const answers = await getQuestionAnswers(question.question_id);
            return {
              ...question,
              answers,
              selectedAnswer: null,
            };
          })
        );
        setQuestions(questionAnswers);
      };
      fetchData();
    }
  }, [quizId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId) => {
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.selectedAnswer;
    const newSelectedAnswer = selectedAnswer === answerId ? null : answerId;
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      selectedAnswer: newSelectedAnswer,
    };
    setQuestions(updatedQuestions);
    setSelectedAnswer(newSelectedAnswer);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.selectedAnswer;
    const isAnswerCorrect = currentQuestion.answers.find(
      (answer) => answer.answer_id === selectedAnswer
    ).is_correct;
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/quizzes/${quizId}/score`, { state: { score } });
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
            <Answers
              key={answer.answer_id}
              answerId={answer.answer_id}
              answerText={answer.answer_text}
              isSelected={currentQuestion.selectedAnswer === answer.answer_id}
              handleAnswerSelect={handleAnswerSelect}
              disabled={showNextButton}
            />
          );
        })}
      </ul>
      <div>
        <Link to='/game/new'>
          <button className={style.button}>Main Menu</button>
        </Link>
        <button
          className={style.button}
          onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        {selectedAnswer && (
          <>
            {currentQuestionIndex === questions.length - 1 ? (
              <button className={style.button} onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button className={style.button} onClick={handleNextQuestion}>
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayGame;
