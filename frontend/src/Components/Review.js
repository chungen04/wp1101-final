import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { process_params } from 'express/lib/router';
const products = [
  {
    name: 'Product 1',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    price: '$14.11',
  },
];

export default function Review(props) {
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Submission summary
      </Typography>
      <List disablePadding>
        {Object.entries(props).map((key) => (
          <ListItem key={key[0]} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={key[0]}/>
            <Typography variant="body2">{key[1]}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}