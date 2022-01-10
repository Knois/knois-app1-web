import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import ButtonAsLink from './ButtonAsLink';
// Новые зависимости
import { useQuery, gql } from '@apollo/client';
// Импортируем Link и withRouter из React Router
import { Link, withRouter } from 'react-router-dom';

// Локальный запрос
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const UserState = styled.div`
  margin-left: auto;
`;
const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
  color: red;
`;

const Header = props => {
  // хук запроса проверки состояния авторизации пользователя, включая клиент для обращения к хранилищу Apollo
  const { data, client } = useQuery(IS_LOGGED_IN);
  return (
    <HeaderBar>
      <img src={logo} alt="Logo" height="40" />
      <LogoText>Hello!!!!</LogoText>
      {/*Если авторизован, отображаем ссылку logout, в противном случае отображаем варианты sign in и sign up*/}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              // Удаляем токен
              localStorage.removeItem('token');
              // Очищаем кэш приложения
              client.resetStore();
              // Обновляем локальное состояние
              client.writeData({ data: { isLoggedIn: false } });
              // Перенаправляем пользователя на домашнюю страницу
              props.history.push('/');
            }}
          >
            Logout
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Register</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};
// Обертываем компонент в компонент высшего порядка withRouter
export default withRouter(Header);
