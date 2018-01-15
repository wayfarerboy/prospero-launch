/* global window */
import React from 'react';
import { compose, withProps } from 'recompose';
import { string, object, oneOfType } from 'prop-types';
import sizeMe from 'react-sizeme';
import LazyLoad from 'react-lazyload';
import { withStyles } from 'material-ui/styles';

import cloudinary from '../helpers/cloudinary.js';

const styles = () => ({
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    lineHeight: 0,
    transition: 'all .2s ease-in-out',
  },
});

const Image = ({ image, classes, size: { width, height } }) => (
  <LazyLoad
    height="100%"
    placeholder={<img src={image.src} className={classes.img} />}
    resize
    offset={64}
  >
    <img {...image} className={classes.img} style={{ width, height }} />
  </LazyLoad>
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
      height: height || window.innerHeight,
      crop: 'fill',
      gravity: 'auto',
    }),
  })),
)(Image);
