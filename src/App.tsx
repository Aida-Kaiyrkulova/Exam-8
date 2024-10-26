import React from 'react';
import NavBar from './components/NavBar/NavBar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';


const App: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} ></Route>
        <Route path="*" element={<Typography variant="h2">Not found</Typography>}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;