import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'My Notes';
  });
  return (
    <div>
      <p>This is the my notes page</p>
    </div>
  );
};

export default MyNotes;
