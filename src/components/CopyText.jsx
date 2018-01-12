import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Element } from 'react-scroll';

const styles = theme => ({
  paper: {
    background: theme.palette.shades.light.background.default,
  },
  title: {
    color: theme.palette.shades.light.text.secondary,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.headline.fontSize,
    },
  },
  body: {
    color: theme.palette.shades.light.text.primary,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.subheading.fontSize,
    },
  },
  wrapper: {
    maxWidth: 960,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    },
  },
});

const CopyText = ({ name, item: { title, body }, classes }) => (
  <Element name={name}>
    <Paper className={classes.paper}>
      <div className={classes.wrapper}>
        <Typography className={classes.title} paragraph type="display1">
          {title}
        </Typography>
        <Typography className={classes.body} paragraph type="title">
          <span dangerouslySetInnerHTML={{ __html: body }} />
        </Typography>
      </div>
    </Paper>
  </Element>
);

export default withStyles(styles)(CopyText);
