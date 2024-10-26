import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quote } from '../../types';
import axiosApi from '../../axiosApi';

const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получение id категории из URL
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await axiosApi.get(`/quotes.json?orderBy="category"&equalTo="${id}"`);
      const data = response.data;
      const fetchedQuotes: Quote[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setQuotes(fetchedQuotes);
    };

    if (id) {
      fetchQuotes();
    }
  }, [id]);

  return (
    <div>
      <h2>{id ? id.replace('-', ' ') : 'All Quotes'}</h2>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <strong>{quote.author}</strong>: {quote.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;