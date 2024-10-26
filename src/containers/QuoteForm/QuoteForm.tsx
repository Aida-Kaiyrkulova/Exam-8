import React, { useEffect, useState } from "react";
import { Quote } from "../../types";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface QuoteFormProps {
  initialQuote?: Quote | null;
  onSubmit: (quote: Quote) => Promise<void>;
  categories: { id: string; title: string }[];
  loading?: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  initialQuote,
  onSubmit,
  categories,
  loading,
}) => {
  const [author, setAuthor] = useState(initialQuote ? initialQuote.author : "");
  const [category, setCategory] = useState(
    initialQuote ? initialQuote.category : "",
  );
  const [text, setText] = useState(initialQuote ? initialQuote.text : "");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialQuote) {
      setAuthor(initialQuote.author);
      setCategory(initialQuote.category);
      setText(initialQuote.text);
    }
  }, [initialQuote]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const quote: Quote = {
      id: initialQuote ? initialQuote.id : Date.now().toString(),
      author,
      category,
      text,
    };

    if (!quote.author || !quote.text || !quote.category) {
      setError("All fields are required.");
      return;
    }

    try {
      await onSubmit(quote);
      setSuccessMessage("Quote submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting quote:", error);
      setError("Failed to submit the quote. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <FormControl fullWidth margin="normal" disabled={loading}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Choose category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
        margin="normal"
        required
        disabled={loading}
      />
      <TextField
        label="Quote"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
        required
        disabled={loading}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : initialQuote ? (
          "Update Quote"
        ) : (
          "Submit Quote"
        )}
      </Button>
    </form>
  );
};

export default QuoteForm;
