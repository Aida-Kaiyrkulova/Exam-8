import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Quote } from '../../types';

interface QuoteListProps {
  quotes: Quote[];
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes }) => {
  return (
    <List>
      {quotes.map((quote) => (
        <ListItem key={quote.id}>
          <Typography variant="body1">
            <strong>{quote.author}:</strong> {quote.text}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default QuoteList;