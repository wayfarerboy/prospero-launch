import React from 'react';
import { arrayOf, object } from 'prop-types';
import { defaultProps, compose, withState, withHandlers } from 'recompose';
import { Animate } from 'react-move';
import withTimeout from 'react-timeout';
import { Element } from 'react-scroll';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({

  wrapper: {
    position: 'relative',
    minHeight: '90vh',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      minHeight: '80vh',
    },
  },

  grid: {
    minHeight: '90vh',
    [theme.breakpoints.down('xs')]: {
      minHeight: '80vh',
    },
  },

  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing.unit * 8,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing.unit * 10,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 20,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing.unit * 30,
    },
  },

  button: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
    minHeight: 0,
    margin: theme.spacing.unit,
  },

  controls: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: 2,
  },

  slide: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    transformOrigin: 'center right',
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

});

const start = { opacity: [0], scale: [0.7], x: [0], zIndex: [0] };
const end = { opacity: [0], scale: [1.1], x: [-30], zIndex: [1] };

const Carousel = ({
  items, classes, active, onSelect, direction, name,
}) => (
  <Element name={name}>
    <div className={classes.wrapper}>
      { items.map(({ title, body, id }, index) => <Animate
        key={id}
        show={index === active}
        start={direction === 1 ? start : end}
        enter={{ opacity: [1], scale: [1], x: [0], zIndex: [1] }}
        leave={direction === 1 ? end: start}
      >
        { ({ opacity, scale, x, zIndex }) => <div
          className={classes.slide}
          style={{
            transform: `translateX(${x}%) scale(${scale})`,
            opacity,
            zIndex: Math.floor(zIndex),
          }}
        >
          <Grid
            container
            className={classes.grid}
            alignItems="flex-end"
            justify="flex-end"
            spacing={0}
          >
            <Grid item xs={12} sm={12} md={6}>
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
        </div> }
      </Animate>) }
      <div className={classes.controls}>
        { items.map((item, index) => <Button
          key={`control-${index}`}
          fab
          mini
          onClick={onSelect(index)}
          color={active === index ? 'accent' : 'primary'}
          className={classes.button}
        >&nbsp;</Button>) }
      </div>
    </div>
  </Element>
);

Carousel.propTypes = {
  items: arrayOf(object),
};

export default compose(
  withTimeout,
  withStyles(styles),
  withState('active', 'setActive', 0),
  withState('direction', 'setDirection', 1),
  withState('tmout', 'setTmout'),
  defaultProps({
    duration: 6000,
  }),
  withHandlers({
    onSelect: ({ setActive, active, setDirection }) => index => () => {
      setDirection(index < active ? -1 : 1, () => {
        setActive(index);
      });
    },
    onNext: ({ setActive, active, setDirection, items }) => () => {
      setDirection(1, () => setActive((active + 1) % items.length));
    },
    onPrev: ({ setActive, active, setDirection, items }) => () => {
      setDirection(-1, () => setActive(((active - 1) + items.length) % items.length));
    },
  }),
  withHandlers({
    onStart: ({ setTmout, setInterval, onNext, duration }) => () => {
      setTmout(setInterval(onNext, duration));
    },
    onStop: ({ tmout, clearInterval }) => () => clearInterval(tmout),
  }),
)(Carousel);
