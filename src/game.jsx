import React, { useRef, useState } from 'react';
import './game.css';
import { Welcome, Play, Result } from './views';
import config from './config.json';

const initGame = () => {
  const levelsConfig = config.levels;
  const randomizedQuestions = config.questions
    .slice()
    .sort(() => Math.floor(Math.random() * 10) - 5);

  const usedQuestions = new Set();

  const levels = levelsConfig.map((level) => {
    const question = randomizedQuestions.find((q) => (
      !usedQuestions.has(q) && q.difficulty === level.difficulty));
    usedQuestions.add(question);

    return {
      ...level,
      question,
    };
  });

  return levels;
};

const useGameLevels = () => {
  const levelsRef = useRef(null);
  if (levelsRef.current == null) levelsRef.current = initGame();

  return [levelsRef.current, initGame];
};

const useGameLogic = () => {
  const [levels, resetLevels] = useGameLevels();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isOver, setOver] = useState(false);

  const currentLevel = levels[currentLevelIndex];
  const currentQuestion = currentLevel.question;

  const checkAnswer = (userValue) => {
    const { answers } = currentQuestion;
    const selectedAnswer = answers.find(({ value: currentValue }) => currentValue === userValue);
    return selectedAnswer && selectedAnswer.correct;
  };

  const processAnswer = (userValue) => {
    if (checkAnswer(userValue)) {
      const targetLevelIndex = currentLevelIndex + 1;
      setCurrentLevelIndex(targetLevelIndex);
      if (targetLevelIndex >= levels.length) setOver(true);
    } else {
      setOver(true);
    }
  };

  const restart = () => {
    resetLevels();
    setCurrentLevelIndex(0);
    setOver();
  };

  const currentReward = levels[currentLevelIndex - 1] != null
    ? levels[currentLevelIndex - 1].reward
    : 0;

  return {
    levels,
    currentLevel,
    currentReward,
    isOver,
    processAnswer,
    restart,
  };
};

const useAnswerDelay = ({ answers: sourceAnswers, processAnswer }, { timeout = 2000 } = {}) => {
  const [userAnswerValue, setUserAnswerValue] = useState('');

  const answers = sourceAnswers.map(({ value, correct }) => ({
    value,
    correct: userAnswerValue !== '' && correct,
    selected: value === userAnswerValue,
  }));

  const processAnswerDebounced = (userValue) => {
    setUserAnswerValue(userValue);

    setTimeout(() => {
      processAnswer(userValue);
      setUserAnswerValue('');
    }, timeout);
  };

  return {
    answers,
    processAnswer: processAnswerDebounced,
  };
};

const generateUserPath = (levels, current) => {
  let currentFound = false;
  return levels.map((level) => {
    const result = {
      reward: level.reward,
      current: level === current,
      passed: !currentFound && level !== current,
    };

    if (level === current) currentFound = true;

    return result;
  });
};

const Game = () => {
  const game = useGameLogic();
  const { answers, processAnswer } = useAnswerDelay({
    answers: game.currentLevel.question.answers,
    processAnswer: game.processAnswer,
  });
  const currentQuestion = game.currentLevel.question;
  const levels = generateUserPath(game.levels, game.currentLevel);

  const [gameStarted, setStarted] = useState(false);
  if (!gameStarted) return <Welcome onStart={() => setStarted(true)} />;

  return game.isOver ? (
    <Result
      finalReward={game.currentReward}
      onRetry={game.restart}
    />
  ) : (
    <Play
      levels={levels}
      question={currentQuestion.question}
      answers={answers}
      onAnswer={processAnswer}
    />
  );
};

export default Game;
