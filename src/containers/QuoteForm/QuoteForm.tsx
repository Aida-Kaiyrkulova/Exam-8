import React, { useEffect, useState } from 'react';
import { Quote } from '../../types';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

interface QuoteFormProps {
  initialQuote?: Quote;
  onSubmit: (quote: Quote) => Promise<void>;
  categories: { id: string; title: string }[];
  loading?: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ initialQuote, onSubmit, categories, loading }) => {
  const [author, setAuthor] = useState(initialQuote ? initialQuote.author : '');
  const [category, setCategory] = useState(initialQuote ? initialQuote.category : '');
  const [text, setText] = useState(initialQuote ? initialQuote.text : '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuote) {
      setAuthor(initialQuote.author);
      setCategory(initialQuote.category);
      setText(initialQuote.text);
    }
  }, [initialQuote]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!author || !category || !text) {
      setError('All fields are required.');
      return;
    }

    const newQuote: Quote = {
      id: initialQuote ? initialQuote.id : Date.now().toString(),
      author,
      category,
      text,
    };

    try {
      await onSubmit(newQuote);
      if (!initialQuote) {
        setAuthor('');
        setCategory('');
        setText('');
      }
    } catch (submitError) {
      setError('Failed to submit the quote. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={e => setCategory(e.target.value)} required variant="outlined">
          <MenuItem value="" disabled>Select Category</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Quote"
        value={text}
        onChange={e => setText(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : (initialQuote ? 'Update Quote' : 'Submit Quote')}
      </Button>
    </form>
  );
};

export default QuoteForm;