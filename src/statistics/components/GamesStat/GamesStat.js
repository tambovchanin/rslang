import React, {
  useMemo, useState, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { gamesStatsSelector } from '../../redux/selectors';

import styles from './GamesStat.module.css';

const games = {
  'puzzle': 'English Puzzle',
  'speakit': 'Speakit',
  'savannah': 'Саванна',
  'audiocall': 'Аудиовызов',
  'sprint': 'Спринт',
  'memory': 'Память',
};

const GamesStat = ({ show, onHide }) => {
  const [tableBody, setTableBody] = useState();
  const gamesStats = useSelector(gamesStatsSelector);

  const tableHeader = useMemo(() => gamesStats
  && Object.keys(gamesStats).map((key) => <th key={key}>{games[key]}</th>),
  [gamesStats]);

  useEffect(() => {
    if (gamesStats) {
      const rows = [];
      const values = Object.values(gamesStats);
      const maxIndex = values
        .reduce((acc, cur) => {
          const { length } = Object.keys(cur);
          return (length > acc ? length : acc);
        }, 0);
      for (let i = 0; i < maxIndex; i++) {
        const date = ['дата'];
        const res = ['результат'];
        for (let j = 0; j < values.length; j++) {
          const keys = Object.keys(values[j]);
          date.push(keys[i]);
          res.push(values[j][keys[i]]);
        }
        const jsxDate = date.map((el, index) => <td key={el + index}>{el}</td>);
        const jsxRes = res.map((el, index) => <td key={el + index}>{el}</td>);
        rows.push(jsxDate);
        rows.push(jsxRes);
      }
      const rowsJSX = rows.map((row, i) => <tr key={`row${i}`}>{row}</tr>);
      setTableBody(rowsJSX);
    }
  }, [gamesStats]);

  return (
    <Modal
      className={styles.Modal}
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.Title}>Мини-игры</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gamesStats && (
          <Table
            className={styles.Table}
            striped
            bordered
            size="sm"
            responsive
          >
            <thead>
              <tr>
                <th>{' '}</th>
                {tableHeader}
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </Table>
        )}
        {!gamesStats && <h1>Нет Результатов</h1>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={styles.CloseBtn}
          variant="secondary"
          onClick={onHide}
        >
            Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

GamesStat.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default GamesStat;
