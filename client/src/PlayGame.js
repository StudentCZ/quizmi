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
  const [quizIdx, setQuizIdx] = useState(null);
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
            selectedAnswer: null,
          };
        })
      );
      setQuestions(questionAnswers);
    };
    fetchData();
  }, [quizId]);

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === 'Enter' && selectedAnswer) {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answers.find(
          (answer) => answer.answer_id === selectedAnswer
        ).is_correct;
        if (isLastQuestion) {
          if (correctAnswer === true) {
            localStorage.removeItem(`quiz-progress`);
            navigate(`/quizzes/${quizId}/score`, {
              state: { score: score + 1, length: questions.length },
            });
          } else {
            localStorage.removeItem(`quiz-progress`);
            navigate(`/quizzes/${quizId}/score`, {
              state: { score: score, length: questions.length },
            });
          }
        } else {
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleEnterKey);
    return () => {
      window.removeEventListener('keydown', handleEnterKey);
    };
  }, [
    currentQuestionIndex,
    navigate,
    questions,
    quizId,
    score,
    selectedAnswer,
  ]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(`quiz-progress`));
    if (savedProgress && savedProgress.quizId === quizId) {
      setQuestions(savedProgress.questions);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setSelectedAnswer(savedProgress.selectedAnswer);
      setShowNextButton(savedProgress.showNextButton);
      setScore(savedProgress.score);
      setQuizIdx(savedProgress.quizId);
    } else {
      const quizProgress = {
        questions,
        currentQuestionIndex,
        selectedAnswer: null,
        showNextButton: false,
        score,
        quizId,
      };
      localStorage.setItem(`quiz-progress`, JSON.stringify(quizProgress));
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
    const isAnswerCorrect = selectedAnswer
      ? currentQuestion.answers.find(
          (answer) => answer.answer_id === selectedAnswer
        ).is_correct
      : false;
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);

    const quizProgress = {
      questions,
      currentQuestionIndex: currentQuestionIndex + 1,
      selectedAnswer: null,
      showNextButton: false,
      score,
      quizId,
    };
    localStorage.setItem(`quiz-progress`, JSON.stringify(quizProgress));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.selectedAnswer;
    const isAnswerCorrect = selectedAnswer
      ? currentQuestion.answers.find(
          (answer) => answer.answer_id === selectedAnswer
        ).is_correct
      : false;

    localStorage.removeItem(`quiz-progress`);
    if (isAnswerCorrect === true) {
      navigate(`/quizzes/${quizId}/score`, {
        state: { score: score + 1, length: questions.length },
      });
    } else {
      navigate(`/quizzes/${quizId}/score`, {
        state: { score, length: questions.length },
      });
    }
  };

  return (
    <div className={style.game_menu}>
      {questions.length ? (
        <>
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
                  isSelected={
                    currentQuestion.selectedAnswer === answer.answer_id
                  }
                  handleAnswerSelect={handleAnswerSelect}
                  disabled={showNextButton}
                />
              );
            })}
          </ul>
          <div>
            <Link to='/'>
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
        </>
      ) : (
        <h1>Hello</h1>
      )}
    </div>
  );
};

export default PlayGame;
