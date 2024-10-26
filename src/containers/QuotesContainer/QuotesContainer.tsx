import React, { useEffect, useState } from "react";
import axiosApi from "../../axiosApi";
import QuoteList from "../../components/QuoteList/QuoteList";
import { Quote } from "../../types";
import { Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuotesContainer: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get("/quotes.json");
        const quotesData = response.data;

        const quotesArray = quotesData
          ? Object.keys(quotesData).map((key) => ({
              id: key,
              ...quotesData[key],
            }))
          : [];

        setQuotes(quotesArray);
      } catch (error) {
        setError("Error loading quotes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleEdit = (quote: Quote) => {
    navigate(`/submit-quote?id=${quote.id}`, { state: { quote } });
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quote?",
    );
    if (!confirmDelete) return;

    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
    } catch (error) {
      setError("Error deleting the quote.");
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4">All Quotes</Typography>
      <QuoteList quotes={quotes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default QuotesContainer;
