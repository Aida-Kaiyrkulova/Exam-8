import React, { useEffect, useState } from "react";
import axiosApi from "../../axiosApi";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Alert } from "@mui/material";
import { Quote } from "../../types";
import QuoteList from "../QuoteList/QuoteList";

const QuotesByCategory: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotesByCategory = async (category: string) => {
    try {
      const response = await axiosApi.get(
        `/quotes.json?orderBy="category"&equalTo="${category}"`,
      );
      const quotesData = response.data;

      return quotesData
        ? Object.keys(quotesData).map((key) => ({
            id: key,
            ...quotesData[key],
          }))
        : [];
    } catch (error) {
      setError("Error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const fetchedQuotes = await fetchQuotesByCategory(id);
        setQuotes(fetchedQuotes);
      };

      fetchData();
    } else {
      setError("Error");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4">Quotes by Category: {id}</Typography>
      {quotes.length === 0 ? (
        <Typography variant="body1">No quotes</Typography>
      ) : (
        <QuoteList quotes={quotes} onEdit={() => {}} onDelete={() => {}} />
      )}
    </div>
  );
};

export default QuotesByCategory;
