import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quote } from "../../types";
import axiosApi from "../../axiosApi";

const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const endpoint = id
          ? `/quotes.json?orderBy="category"&equalTo="${id}"`
          : `/quotes.json`; // Если id нет, получить все цитаты
        const response = await axiosApi.get(endpoint);
        const data = response.data;

        const fetchedQuotes: Quote[] = data
          ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          : [];

        setQuotes(fetchedQuotes);
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>{id ? id.replace("-", " ") : "All quotes"}</h2>
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
