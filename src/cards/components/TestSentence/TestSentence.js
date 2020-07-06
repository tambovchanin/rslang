import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  setAnswered, setWasMistaken,
} from '../../redux';
import styles from './TestSentence.module.css';

const mistakesInWord = (wrongWord, word) => {
  const rightLetters = word.split('');
  return rightLetters.map((el, i) => (el === wrongWord[i]
    ? (
      <span
        key={`letter${i}`}
        className={styles.RightLetter}
      >
        {wrongWord[i]}
      </span>
    )
    : (
      <span
        key={`letter${i}`}
        className={styles.WrongLetter}
      >
        {el}
      </span>
    )));
};

const TestSentence = ({
  testSentenceArr, word, playAudio,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [mistake, setMistake] = useState();
  const wrongAnswer = useMemo(() => mistake && (
    <div className={styles.sentenceRight}>
      {testSentenceArr[0]}
      <span className={styles.WrongAnswer}>
        {mistakesInWord(mistake, word)}
      </span>
      {testSentenceArr[1]}
    </div>
  ), [word, mistake, testSentenceArr]);
  let wordInput;

  useEffect(() => { wordInput.focus(); }, [wordInput]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (value.toLowerCase() === word) {
      if (!mistake) dispatch(setWasMistaken(false));
      playAudio();
      setMistake();
      dispatch(setAnswered(true));
    } else {
      dispatch(setWasMistaken(true));
      setMistake(value);
    }
    setValue('');
  }, [playAudio, value, word, setMistake, dispatch, mistake]);

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles.sentence}>
        {testSentenceArr[0]}
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          ref={(input) => { wordInput = input; }}
          size={word.length}
          required
        />
        {testSentenceArr[1]}
      </p>
      {wrongAnswer}
      <Button type="submit" className={styles.SubmitBtn}>Проверить</Button>
    </form>
  );
};

TestSentence.propTypes = {
  testSentenceArr: PropTypes.array.isRequired,
  word: PropTypes.string.isRequired,
  playAudio: PropTypes.func.isRequired,
};

export default TestSentence;
