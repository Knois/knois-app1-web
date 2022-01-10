import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Favorites';
  });
  return (
    <div>
      <p>This is the favorites page</p>
    </div>
  );
};

export default Favorites;
