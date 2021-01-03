import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { IBook } from '../interfaces/book';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    title: {
      fontWeight: 'bold',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

const BookListItem: React.FC<IBook> = (props) => {
  const classes = useStyles();

  const bookAttributes = {
    author: 'Author',
    categories: 'Categories',
    publisher: 'Publisher',
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={props.title} src={props.thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column'>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1' className={classes.title}>
                  {props.title}
                </Typography>
              </Grid>
              {(Object.keys(bookAttributes) as Array<keyof typeof bookAttributes>).map((attr) => (
                <Grid item xs container direction='row' key={attr}>
                  <Typography variant='body2'>{bookAttributes[attr]}:</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {props[attr]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BookListItem;
