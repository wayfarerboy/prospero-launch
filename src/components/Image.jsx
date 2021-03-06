/* global window */
import React from 'react';
import { compose, withProps } from 'recompose';
import { string, object, oneOfType } from 'prop-types';
import sizeMe from 'react-sizeme';
import { withStyles } from 'material-ui/styles';

import cloudinary from '../helpers/cloudinary.js';

const styles = () => ({
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    lineHeight: 0,
    transition: 'all .2s ease-in-out',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  },
});

const Image = ({ image, classes, size: { width, height } }) => (
  <img {...image} className={classes.img} style={{ width, height }} />
);

Image.propTypes = {
  image: oneOfType([string, object]),
  classes: object,
  size: object,
};

export default compose(
  withStyles(styles),
  sizeMe({ monitorHeight: true }),
  withProps(({ image: publicId, size: { width, height } }) => ({
    image: cloudinary.getSrc({
      publicId,
      width: 1920,
    }, {
      cloudName: 'candt',
      width: width || window.innerWidth,
      height: height || window.innerHeight * 0.8,
      crop: 'fill',
      gravity: 'auto',
    }),
  })),
)(Image);
