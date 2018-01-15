import React from 'react';
import { string, object } from 'prop-types';
import Helmet from 'react-helmet';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from 'material-ui/styles';

import Carousel from './Carousel.jsx';
import CopyText from './CopyText.jsx';
import Footer from './Footer.jsx';

import { carousels, body, footer, logos } from '../content/data.js';

const styles = theme => ({
  wrapper: {
    maxWidth: 960,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    },
  },
});

const Content = ({ className, classes }) => (
  <div className={className}>
    <Helmet>
      <title>Prospero</title>
    </Helmet>
    <Carousel items={carousels[0]} name="carousel1" />
    <CopyText className={classes.wrapper} item={body[0]} name="text1" />
    <Carousel items={carousels[1]} name="carousel2" />
    <CopyText className={classes.wrapper} item={body[1]} name="text2" />
    <Carousel items={carousels[2]} name="carousel3" />
    <CopyText className={classes.wrapper} item={body[2]} name="text3" />
    <Carousel items={carousels[3]} name="carousel4" />
    <Footer className={classes.wrapper} name="text4" content={footer} logos={logos} />
  </div>
);

Content.displayName = 'Content';
Content.propTypes = {
  className: string,
  classes: object,
};

export default compose(
  withStyles(styles),
  onlyUpdateForKeys([]),
)(Content);
