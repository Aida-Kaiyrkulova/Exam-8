import React, { useState } from 'react';
import QuoteForm from '../../containers/QuoteForm/QuoteForm';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { Quote } from '../../types';

interface Category {
  title: string;
  id: string;
}

const categories: Category[] = [
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous people', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];

const SubmitQuote: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (quote: Quote) => {
    setLoading(true);
    setError(null);
    try {
      await axiosApi.post('/quotes.json', quote);
      navigate('/');
    } catch (error) {
      console.error("Error", error);
      setError("Failed to submit the quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit a New Quote</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <QuoteForm onSubmit={handleSubmit} categories={categories} loading={loading} />
    </div>
  );
};

export default SubmitQuote;