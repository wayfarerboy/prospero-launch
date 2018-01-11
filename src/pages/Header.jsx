import React from 'react';
import { object } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import logo from '../media/logo.svg';

const styles = () => ({
  logo: {
    width: 210,
    position: 'relative',
    bottom: -10,
    objectFit: 'cover',
    height: 64,
  },
});

const Header = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <img className={classes.logo} src={logo} alt="Prospero logo" />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: object,
};

export default withStyles(styles)(Header);
