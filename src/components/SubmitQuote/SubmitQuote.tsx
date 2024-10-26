import QuoteForm from '../../containers/QuoteForm/QuoteForm';
import { Quote } from '../../types';
import React from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

const SubmitQuote: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (quote: Quote) => {
    try {
      await axiosApi.post('/quotes.json', quote);
      navigate('/');
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h2>Submit a New Quote</h2>
      <QuoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SubmitQuote;