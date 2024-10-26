import { Form } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Quote } from '../../types';
import { Button, TextField } from '@mui/material';


interface QuoteFormProps {
  initialQuote?: Quote;
  onSubmit: (quote: Quote) => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ initialQuote, onSubmit }) => {
  const [author, setAuthor] = useState(initialQuote ? initialQuote.author : '');
  const [category, setCategory] = useState(initialQuote ? initialQuote.category : '');
  const [text, setText] = useState(initialQuote ? initialQuote.text : '');

  useEffect(() => {
    if (initialQuote) {
      setAuthor(initialQuote.author);
      setCategory(initialQuote.category);
      setText(initialQuote.text);
    }
  }, [initialQuote]);

  const handleSubmit = () => {
    const newQuote: Quote = {
      id: initialQuote ? initialQuote.id : '',
      author,
      category,
      text,
    };
    onSubmit(newQuote);
    setAuthor('');
    setCategory('');
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        label="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quote"
        value={text}
        onChange={e => setText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {initialQuote ? 'Update Quote' : 'Submit Quote'}
      </Button>
    </Form>
  );
};

export default QuoteForm;