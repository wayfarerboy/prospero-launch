import React from 'react';
import { arrayOf, string, func, object, number } from 'prop-types';
import { compose, withProps } from 'recompose';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
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
});

const Controls = ({ items, onSelect, classes, active }) => (
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
);

Controls.propTypes = {
  items: arrayOf(string),
  onSelect: func,
  classes: object,
  active: number,
};

Controls.displayName = 'Controls';

export default compose(
  withStyles(styles),
  withProps(({ length }) => ({
    items: Array.from(Array(length)).map((x, i) => `control-${i}`),
  })),
)(Controls);

