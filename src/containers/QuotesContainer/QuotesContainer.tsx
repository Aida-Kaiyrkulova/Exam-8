import React, { useEffect, useState } from "react";
import axiosApi from "../../axiosApi";
import QuoteList from "../../components/QuoteList/QuoteList";
import { Quote } from "../../types";
import { Typography, CircularProgress, Alert } from "@mui/material";

const QuotesContainer: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get('/quotes.json');
        const quotesData = response.data;

        const quotesArray = quotesData
          ? Object.keys(quotesData).map((key) => ({
            id: key,
            ...quotesData[key],
          }))
          : [];

        setQuotes(quotesArray);
      } catch (error) {
        setError("Ошибка при загрузке цитат. Попробуйте еще раз.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4">Все Цитаты</Typography>
      <QuoteList quotes={quotes} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default QuotesContainer;