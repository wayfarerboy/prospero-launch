import React from 'react';
import { shape, string, object } from 'prop-types';
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
});

const CopyText = ({ name, item: { title, body }, classes, className }) => (
  <Element name={name}>
    <Paper className={classes.paper}>
      <div className={className}>
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

CopyText.propTypes = {
  name: string,
  item: shape({
    title: string,
    body: string,
  }),
  classes: object,
  className: string,
};

export default withStyles(styles)(CopyText);
