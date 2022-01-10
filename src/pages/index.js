import React from 'react';
//Маршрутизация
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import MyNotes from './MyNotes';
import Favorites from './Favorites';
import NotePage from './NotePage';
import SignUp from './SignUp';
import SignIn from './SignIn';
//Оборачиваем в главный компонент, чтобы на каждой странице были такие компоненты как Header и т.д.
import Layout from '../components/Layout';

import { useQuery, gql } from '@apollo/client';
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

// Добавляем компонент PrivateRoute под компонентом 'Pages'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // Если данные загружаются, выводим сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, выводим сообщение об ошибке
  if (error) return <p>Error!</p>;
  // Если пользователь авторизован, направляем его к запрашиваемому компоненту. В противном случае перенаправляем на страницу авторизации
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
export default Pages;
