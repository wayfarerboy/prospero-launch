import React from 'react';
import { arrayOf, object, func, number, string } from 'prop-types';
import { defaultProps, compose, withState, withHandlers } from 'recompose';
import withTimeout from 'react-timeout';
import { Element } from 'react-scroll';

import { withStyles } from 'material-ui/styles';

import Slide from './Slide.jsx';
import Controls from './Controls.jsx';

const timing = '.4s';
const height = '80vh';

const styles = () => ({

  wrapper: {
    position: 'relative',
    minHeight: height,
    overflow: 'hidden',
  },

  slide: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    transition: `opacity ${timing} ease-in-out`,
    opacity: 0,
    pointerEvents: 'none',
  },

  active: {
    opacity: 1,
    transition: `opacity ${timing} ease-in-out ${timing}`,
  },
});

const Carousel = ({
  items, classes, active, onSelect, name,
}) => (
  <Element name={name}>
    <div className={classes.wrapper}>
      { items.map(({ title, body, id, image }, index) => <Slide
        key={id}
        className={`${classes.slide} ${active === index ? classes.active : ''}`}
        title={title}
        body={body}
        image={image}
      />) }
      <Controls length={items.length} onSelect={onSelect} active={active} />
    </div>
  </Element>
);

Carousel.propTypes = {
  items: arrayOf(object),
  classes: object,
  onSelect: func,
  name: string,
  active: number,
};

export default compose(
  withTimeout,
  withStyles(styles),
  withState('active', 'setActive', 0),
  withState('tmout', 'setTmout'),
  defaultProps({
    duration: 6000,
  }),
  withHandlers({
    onSelect: ({ setActive }) => index => () => {
      setActive(index);
    },
    onNext: ({ setActive, active, items }) => () => {
      setActive((active + 1) % items.length);
    },
    onPrev: ({ setActive, active, items }) => () => {
      setActive(((active - 1) + items.length) % items.length);
    },
  }),
  withHandlers({
    onStart: ({ setTmout, setInterval, onNext, duration }) => () => {
      setTmout(setInterval(onNext, duration));
    },
    onStop: ({ tmout, clearInterval }) => () => clearInterval(tmout),
  }),
)(Carousel);
