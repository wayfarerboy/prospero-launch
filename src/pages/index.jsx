import React from 'react';
import { object, bool } from 'prop-types';
import Helmet from 'react-helmet';
import { compose, withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import withWidth, { isWidthDown } from 'material-ui/utils/withWidth';

import Menu from '../components/Menu.jsx';
import withRoot from '../withRoot.js';
import Header from '../components/Header.jsx';
import Content from '../components/Content.jsx';

const styles = theme => ({
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(150deg, #263238 0%,#263238 50%,#1d262a 50%,#1d262a 100%)',
  },
  content: {
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={this.props.classes.body}>
        <Helmet>
          <title>Prospero</title>
          <link href="https://fonts.googleapis.com/css?family=Catamaran:400,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Helmet>
        <Header smDown={this.props.showMenu} />
        <Content className={this.props.classes.content} />
        { this.props.showMenu && <Menu /> }
      </div>
    );
  }
}

App.propTypes = {
  classes: object,
  showMenu: bool,
};

export default compose(
  withRoot,
  withStyles(styles),
  withWidth(),
  withProps(({ width }) => ({ showMenu: isWidthDown('sm', width) })),
)(App);
