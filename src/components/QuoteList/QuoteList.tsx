import React from "react";
import { Quote } from "../../types";
import { Button, List, ListItem, ListItemText } from "@mui/material";

interface QuoteListProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, onEdit, onDelete }) => {
  return (
    <List>
      {quotes.map((quote) => (
        <ListItem key={quote.id}>
          <ListItemText primary={`${quote.author}: "${quote.text}"`} />
          <Button variant="outlined" onClick={() => onEdit(quote)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(quote.id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default QuoteList;
