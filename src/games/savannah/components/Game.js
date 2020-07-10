import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dictionary from './Dictionary';
import GameWrapper from './GameWrapper';
import { getRandomNumber, shuffle } from './Helpers';
import Lives from './Lives';
import { Rules, Exit } from './Modal';

const classNames = require('classnames');

export default function Game() {
  const dispatch = useDispatch();

  let counterCrystalSize = 0.7;
  const [gettingWords, setGettingWords] = useState(true);
  const [livesCount, setLivesCount] = useState(5);
  const [word, setWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');

  const [btnClicked, setBtnClicked] = useState(false);
  const [scaleSize, setScaleSize] = useState(counterCrystalSize);
  const [arrOfWords, setArrOfWords] = useState([]);

  const [wordCounter, setWordCounter] = useState(40);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isRules, setIsRules] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const [timeFall, setTimeFall] = useState(true);

  useEffect(() => {
    if (gettingWords && livesCount) {
      const randomNumber = getRandomNumber();
      const newWord = dictionary[randomNumber].word;
      const newAnswer = dictionary[randomNumber].translate;
      setWord(newWord);
      setRightAnswer(newAnswer);
      const arrOfTranslations = [];
      arrOfTranslations.push(newAnswer);

      let counter = 0;
      while (counter < 3) {
        const translation = dictionary[getRandomNumber()].translate;
        arrOfTranslations.push(translation);
        counter += 1;
      }

      const shuffledTranslations = shuffle(arrOfTranslations);

      setArrOfWords(shuffledTranslations);
      setGettingWords(false);
      console.log('use effect 1 = refresh words');
    }
  }, [livesCount, gettingWords]);

  const audioRight = new Audio('./../assets/audio/right.mp3');
  const audioWrong = new Audio('./../assets/audio/wrong.mp3');

  const playRight = () => {
    audioRight.play();
  };
  const playWrong = () => {
    audioWrong.play();
  };

  function checkAnswer(wordActive, answerActive) {
    if (wordActive === answerActive) {
      console.log('right');
      setAnswer(true);
      setBtnClicked(true);
      setScaleSize(counterCrystalSize += 0.02);
      setWordCounter(wordCounter - 1);
      playRight();
    } else {
      console.log('wrong');
      setAnswer(false);
      setBtnClicked(true);
      setLivesCount(livesCount - 1);
      console.log('-life in checkAnswer');
      setWordCounter(wordCounter - 1);
      playWrong();
    }
  }

  const refreshWordsOnClick = useCallback(() => {
    setTimeout(() => {
      setGettingWords(true);
      setAnswer(false);
      setBtnClicked(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (livesCount) {
        setGettingWords(true);
        setAnswer(false);
        setLivesCount(livesCount - 1);
        console.log('use effect 2 = -life in useEffect');
      }
    }, 4700);

    return () => {
      clearTimeout(timer);
    };
  }, [livesCount]);

  const gameOverHandler = useCallback(() => {
    setIsGameOver(true);
    setWord(' ');
  }, []);

  return (
    <GameWrapper>
      {isExit ? (
        <Exit
          onCancel={() => setIsExit(false)}
          onExit={() => <Link to="./" /> }
        />
      ) : false}

      {isRules ? (
        <Rules
          onRules={() => setIsRules(false)}
        />
      ) : false}
      <img
        className="tree-wave"
        src="./../assets/images/savannah/tree_waved.svg"
        alt="tree waved"
      />
      <img
        className="tree-tall"
        src="./../assets/images/savannah/tree_tall.svg"
        alt="tree tall"
      />
      <img
        className="sound"
        src="./../assets/images/savannah/notification_on.svg"
        alt="sound"
      />
      <div
        onClick={() => setIsRules(true)}
      >
        <img
          className="question"
          src="./../assets/images/savannah/question.svg"
          alt="question with info about game"
        />
      </div>
      <div
        onClick={() => setIsExit(true)}
      >
        <img
          className="cross"
          src="./../assets/images/savannah/x_white.svg"
          alt="close"
        />
      </div>

      <Lives
        livesCount={livesCount}
        leftLifesHandler={gameOverHandler}
        src="./../assets/images/savannah/heart_full.svg"
      />
      {
        isGameOver
          ? <h2 style={{ textAlign: 'center', color: 'red' }}>Game Over</h2>
          : ''
      }
      <div
        className={classNames('wrapper_falling',
          { 'animation': !btnClicked },
          { 'no-animation': btnClicked },
          { 'no-animation': isGameOver })}
      >
        <h3 className="falling_word">
          {(word)}
        </h3>
      </div>
      <div className="listWords">
        <button
          onClick={(e) => {
            checkAnswer(arrOfWords[0], rightAnswer);
            refreshWordsOnClick();
          }}
          type="button"
          className={classNames(
            { 'wrong': btnClicked && arrOfWords[0] !== rightAnswer },
            { 'right': btnClicked && arrOfWords[0] === rightAnswer },
          )}
        >
          {(arrOfWords[0])}
        </button>
        <button
          onClick={(e) => {
            checkAnswer(arrOfWords[1], rightAnswer);
            refreshWordsOnClick();
          }}
          type="button"
          className={classNames(
            { 'wrong': btnClicked && arrOfWords[1] !== rightAnswer },
            { 'right': btnClicked && arrOfWords[1] === rightAnswer },
          )}
        >
          {(arrOfWords[1])}
        </button>
        <button
          onClick={() => {
            checkAnswer(arrOfWords[2], rightAnswer);
            refreshWordsOnClick();
          }}
          type="button"
          className={classNames(
            { 'wrong': btnClicked && arrOfWords[2] !== rightAnswer },
            { 'right': btnClicked && arrOfWords[2] === rightAnswer },
          )}
        >
          {(arrOfWords[2])}
        </button>
        <button
          onClick={() => {
            checkAnswer(arrOfWords[3], rightAnswer);
            refreshWordsOnClick();
          }}
          type="button"
          className={classNames(
            { 'wrong': btnClicked && arrOfWords[3] !== rightAnswer },
            { 'right': btnClicked && arrOfWords[3] === rightAnswer },
          )}
        >
          {(arrOfWords[3])}
        </button>
      </div>

      <img
        className={classNames('crystall', {})}
        src="./../assets/images/savannah/crystall_2.svg"
        alt="violet crystall"
        style={{ transform: `scale(${scaleSize})` }}
      />
    </GameWrapper>
  );
}
