import React from 'react';

const Note = ({ note }) => {
  return (
    <div>
      <img
        src={note.author.avatar}
        alt="{note.author.username} avatar"
        height="50px"
      />
      <div>{note.author.username}</div>
      <div>{note.createdAt}</div>
      <div>{note.favoriteCount}</div>
      <div>{note.content}</div>
    </div>
  );
};
export default Note;
