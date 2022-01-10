import React from 'react';
//Маршрутизация
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import MyNotes from './MyNotes';
import Favorites from './Favorites';
//Оборачиваем в главный компонент, чтобы на каждой странице были такие компоненты как Header и т.д.
import Layout from '../components/Layout';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={MyNotes} />
        <Route path="/favorites" component={Favorites} />
      </Layout>
    </Router>
  );
};
export default Pages;
