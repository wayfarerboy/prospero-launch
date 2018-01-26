import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const scale = 100;
const sprites = 10;

const styles = theme => ({
  icon: {
    width: scale,
    height: scale,
    background: `url(/affiliates.svg) no-repeat`,
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      width: scale * 1.5,
      height: scale * 1.5,
    },
  },
});

const Affiliates = ({ logos, classes, className }) => (
  <Grid container justify="center" className={className}>
    { logos.map((logo, index) => <Grid
      item
      key={`logo-${index}`}
      className={classes.icon}
      style={{
        backgroundPosition: `0 ${(100 / (sprites - 1)) * logo.row}%`,
      }}
    />) }
  </Grid>
);

Affiliates.displayName = 'Affiliates';

Affiliates.propTypes = {
  logos: arrayOf(object),
  classes: object,
  className: string,
};

Affiliates.defaultProps = {
  size: 96,
};

export default withStyles(styles)(Affiliates);
