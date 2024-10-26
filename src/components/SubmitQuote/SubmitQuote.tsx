import React, { useState } from "react";
import QuoteForm from "../../containers/QuoteForm/QuoteForm";
import axiosApi from "../../axiosApi";
import { useNavigate } from "react-router-dom";
import { Alert, Typography } from "@mui/material";

const categories = [
  { title: "Star Wars", id: "star-wars" },
  { title: "Famous people", id: "famous-people" },
  { title: "Saying", id: "saying" },
  { title: "Humour", id: "humour" },
  { title: "Motivational", id: "motivational" },
];

const SubmitQuote: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateQuote = (quote: {
    author: string;
    text: string;
    category: string;
  }) => {
    return quote.author && quote.text && quote.category;
  };

  const handleSubmit = async (quote: {
    author: string;
    text: string;
    category: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!validateQuote(quote)) {
      setError("Fill all fields");
      setLoading(false);
      return;
    }

    try {
      await axiosApi.post("/quotes.json", quote);
      setSuccessMessage("Quote submit successfully");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError("Cant add quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Add new quote</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <QuoteForm
        onSubmit={handleSubmit}
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default SubmitQuote;
