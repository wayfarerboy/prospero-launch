import React from 'react';
import { scroller } from 'react-scroll';
import { compose, withHandlers } from 'recompose';
import withTimeout from 'react-timeout';
import { connectModule } from 'redux-modules';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-scroll';

import { menu as menuModule } from '../redux.js';
import { links } from '../content/data.js';

import logo from '../media/logo.svg';

const styles = theme => ({
  toolbar: {
    height: theme.spacing.unit * 20,
    position: 'relative',
    minWidth: 320,
  },
  logo: {
    width: 240,
    objectFit: 'cover',
    height: 80,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  active: {
    zIndex: 1,
    position: 'relative',
    boxShadow: theme.shadows[5],
  },
});

const Menu = ({ menu: { open } = {}, actions: { close } = {}, classes, onClick }) => (
  <Drawer
    open={open}
    onClose={close}
    anchor="left"
  >
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img className={classes.logo} src={logo} alt="Prospero logo" />
        <IconButton className={classes.close} onClick={close}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>

    <List>
      { links.map(({ id, title }) => <ListItem
        key={id}
        button
        onClick={onClick(id)}
        component={Link}
        to={id}
        offset={-64}
        spy
        activeClass={classes.active}
      >
        <ListItemText primary={title} />
      </ListItem>) }
    </List>
  </Drawer>
);

export default compose(
  withTimeout,
  withStyles(styles),
  connectModule(menuModule),
  withHandlers({
    onClick: ({ setTimeout, actions: { close } }) => id => () => {
      close();
      setTimeout(() => {
        scroller.scrollTo(id, {
          offset: -64,
          smooth: true,
        });
      }, 100);
    },
  }),
)(Menu);
