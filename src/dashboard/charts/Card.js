import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,


  },
  com:{
    color:"white"
  },
  bullet: {
    display: 'inline-block',
    margin: '02px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color:"white"
  },
  
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  

  return (
    <Card className={classes.root} style={{backgroundColor:props.bkcolor}}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h4" component="h4" className={classes.com}>
            {props.count}
        </Typography>   
      </CardContent>
      <CardActions>
        <Button size="small"  className={classes.com} >Learn More</Button>
      </CardActions>
    </Card>
  );
}