import React from 'react';
import { string, object } from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Image from './Image.jsx';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: 0,
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing.unit * 10,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing.unit * 8,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 20,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing.unit * 30,
    },
  },

  display1: {
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.title.fontSize,
    },
  },

  headline: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  },

  imgWrapper: {
    lineHeight: 0,
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },

  grid: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  },

});

const Slide = ({ classes, title, body, image, className }) => (
  <div className={className}>
    <Grid
      container
      className={classes.grid}
      spacing={0}
      wrap="nowrap"
    >
      <Grid item sm xs className={classes.imgWrapper}>
        <Image image={image} />
      </Grid>
      <Grid item md={6}>
        <Paper className={classes.paper}>
          <Typography className={classes.display1} type="display1">
            {title}
          </Typography>
          <Typography
            className={classes[!title ? 'display1' : 'headline']}
            type={!title ? 'display1' : 'headline'}
          >
            <span dangerouslySetInnerHTML={{ __html: body }} />
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

Slide.propTypes = {
  classes: object,
  title: string,
  body: string,
  image: string,
  className: string,
};

Slide.displayName = 'Slide';

export default withStyles(styles)(Slide);
