import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,  Route,
} from 'react-router-dom';
// import Menu from './layout/components/Menu/Menu';
import styles from './App.module.css';
import Promo from './layout/components/Promo';

// const routes = [
//   {
//     title: 'Профиль',
//     path: '/profile',
//   },
//   {
//     title: 'Настройки',
//     path: '/settings',
//   },
//   {
//     title: 'Игры',
//     path: '/games',
//   },
//   {
//     title: 'Карточки',
//     path: '/cards',
//   },
//   {
//     title: 'Словарь',
//     path: '/dictionary',
//   },
//   {
//     title: 'Статистика',
//     path: '/statistics',
//   },
//   {
//     title: 'Страница авторизации',
//     path: '/login',
//   },
//   {
//     title: 'Страница регистрации',
//     path: '/signin',
//   }
// ];

function createRoute({ title, path }) {
  return (
    <Route key={title} exact path={path}>
      <div className={styles.PageName}>
        <h1>{title}</h1>
      </div>
    </Route>
  );
}

createRoute.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const App = () => (
  <Router>
    {/*<Menu />*/}
    {/*<Switch>*/}
    {/*  {routes.map(createRoute)}*/}
    {/*</Switch>*/}
    <Promo />
  </Router>
);
export default App;
