import React from 'react';
import { List, ListItem, Typography, Button, Divider } from '@mui/material';
import { Quote } from '../../types';

interface QuoteListProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (quoteId: string) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, onEdit, onDelete }) => {
  if (quotes.length === 0) {
    return <Typography variant="body1">No quotes submit yet.</Typography>;
  }

  return (
    <List>
      {quotes.map((quote) => (
        <React.Fragment key={quote.id}>
          <ListItem>
            <Typography variant="body1" style={{ flexGrow: 1 }}>
              <strong>{quote.author}:</strong> {quote.text}
            </Typography>
            <Button variant="outlined" color="primary"  style={{marginRight: 10}} onClick={() => onEdit(quote)}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => onDelete(quote.id)}>
              Delete
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default QuoteList;
