import React from 'react';
import { object } from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { scroller } from 'react-scroll';
import { connectModule } from 'redux-modules';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-scroll';

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

const Header = ({ actions: { open } = {}, classes, onClick }) => (
  <div>
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton onClick={open} className={classes.menu}>
            <Icon>menu</Icon>
          </IconButton>
        </div>
        <img className={classes.logo} src={logo} alt="Prospero logo" />
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
};

export default compose(
  withStyles(styles),
  connectModule(menuModule),
  withHandlers({
    onClick: () => id => () => {
      scroller.scrollTo(id, {
        offset: -64,
        smooth: true,
      });
    },
  }),
)(Header);
