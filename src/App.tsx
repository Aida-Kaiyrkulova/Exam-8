import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Box, Container, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import SubmitQuote from "./components/SubmitQuote/SubmitQuote";
import Sidebar from "./components/SideBar/SideBar";
import QuotesByCategory from "./components/QuotesByCategory/QuotesByCategory";
import QuotesContainer from "./containers/QuotesContainer/QuotesContainer.tsx";

const App: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "250px", borderRight: "1px solid #ccc" }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="submit-quote" element={<SubmitQuote />} />
            <Route path="quotes" element={<QuotesContainer />} />
            <Route path="category/:id" element={<QuotesByCategory />} />
            <Route
              path="*"
              element={<Typography variant="h2">Not found</Typography>}
            />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default App;
