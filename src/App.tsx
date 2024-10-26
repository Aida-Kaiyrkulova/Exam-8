import React from 'react';
import NavBar from './components/NavBar/NavBar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import SubmitQuote from './components/SubmitQuote/SubmitQuote.tsx';

const App: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-quote" element={<SubmitQuote />} />
          <Route path="*" element={<Typography variant="h2">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;