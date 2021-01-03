import React, { useState } from 'react';
import NavBar from './components/Navbar';
import BookList from './components/BookList';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <BookList  search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
