import React from 'react';
import { compose } from 'recompose';
import { arrayOf, string, object } from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Element } from 'react-scroll';

import Affiliates from './Affiliates.jsx';

const styles = theme => ({
  wrapper: {
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
  content: {
    maxWidth: 960,
    margin: '0 auto',
  },
  buttonWrapper: {
    maxWidth: 960,
    textAlign: 'center',
    margin: '0 auto',
  },
  button: {
    fontSize: theme.typography.display1.fontSize,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 8}px`,
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.title.fontSize,
    },
  },
  affiliates: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
  },
});

const Footer = ({ content, logos, classes, className }) => (
  <Element name="text4">
    <div className={classes.wrapper}>
      <div className={className}>
        <Typography className={classes.title} paragraph type="display1">
          Join us
        </Typography>
        { content.map((body, index) => <div key={`footer-${index}`} className={classes.content}>
          <Typography className={classes.body} paragraph type="title">
            <span dangerouslySetInnerHTML={{ __html: body }} />
          </Typography>
          { index === 1 && <Affiliates className={classes.affiliates} logos={logos} /> }
        </div>) }
        <div className={classes.buttonWrapper}>
          <Button href="http://eepurl.com/bC4oUr" raised className={classes.button} color="primary">
            Join us
          </Button>
        </div>
      </div>
    </div>
  </Element>
);

Footer.propTypes = {
  content: arrayOf(string),
  logos: arrayOf(object),
  classes: object,
  className: string,
};

export default compose(
  withStyles(styles),
)(Footer);
