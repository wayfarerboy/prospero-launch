/* global window */
import React from 'react';
import { object, shape, func, number } from 'prop-types';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import { scroller } from 'react-scroll';
import { connectModule } from 'redux-modules';

import Hidden from 'material-ui/Hidden';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-scroll';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';

import { menu as menuModule } from '../redux.js';
import { links } from '../content/data.js';

import logo from '../media/logo.svg';

const styles = theme => ({
  logo: {
    width: 210,
    position: 'relative',
    bottom: -10,
    objectFit: 'cover',
    height: 64,
    transformOrigin: 'top left',
  },
  toolbar: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit,
    },
  },
  menu: {
    display: 'none',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
    },
  },
  link: {
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  flex: {
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    },
  },
  active: {
    zIndex: 1,
    position: 'relative',
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary[500],
  },
});

const Header = ({ actions: { open } = {}, classes, onClick, scale }) => (
  <div>
    <AppBar style={{ transform: `translateY(${scale * -64}px)` }}>
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton onClick={open} className={classes.menu}>
            <Icon>menu</Icon>
          </IconButton>
        </div>

        <Hidden implementation="css" smDown>
          <img
            className={classes.logo}
            src={logo}
            alt="Prospero logo"
            style={{
              bottom: -10 - (130 * scale),
              transform: `scale(${1 + scale})`,
            }}
          />
        </Hidden>

        <Hidden implementation="css" mdUp>
          <img
            className={classes.logo}
            src={logo}
            alt="Prospero logo"
          />
        </Hidden>

        { links.map(({ id, title }, index) => <Button
          color={index === links.length - 1 ? 'accent' : 'default'}
          component={Link}
          to={id}
          key={id}
          spy
          offset={-64}
          raised={index === links.length - 1}
          className={classes.link}
          activeClass={classes.active}
          onClick={onClick(id)}
        >
          <Typography type="button">{title}</Typography>
        </Button>) }
        <div className={classes.flex} />
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: object,
  actions: shape({
    open: func,
  }),
  onClick: func,
  scale: number,
};

export default compose(
  withStyles(styles),
  withWidth(),
  connectModule(menuModule),
  withState('scale', 'setScale', ({ width }) => {
    if (isWidthUp('md', width)) return 2;
    return 0;
  }),
  withHandlers({
    onClick: () => id => () => {
      scroller.scrollTo(id, {
        offset: -64,
        smooth: true,
      });
    },
    onScroll: ({ setScale, scale }) => () => {
      if (window.scrollY <= 64 * 2) {
        setScale(1 - (window.scrollY - 64) / 64);
      } else if (scale > 0 && window.scrollY > 64 * 2) {
        setScale(0);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      if (isWidthUp('md', this.props.width)) {
        window.addEventListener('scroll', this.props.onScroll);
      }
    },
    componentWillUnmount() {
      if (isWidthUp('md', this.props.width)) {
        window.removeEventListener('scroll', this.props.onScroll);
      }
    },
  }),
)(Header);
