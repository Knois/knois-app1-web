import React from 'react';
import Button from '../components/Button';
import ReactMarkdown from 'react-markdown';

import { useQuery, gql } from '@apollo/client';
// Наш GraphQL-запрос, хранящийся в виде переменной
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  // Хук запроса
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  // Если данные загружаются, отображаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error!</p>;
  // Если данные получены успешно, отображаем их в UI
  return (
    <div>
      {data.noteFeed.notes.map(note => (
        <article key={note.id}>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
          {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
          <ReactMarkdown source={note.content} />
        </article>
      ))}
    </div>
  );
};
export default Home;
