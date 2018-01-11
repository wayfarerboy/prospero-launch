import React from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from 'recompose';

import { withStyles } from 'material-ui/styles';

import withRoot from '../withRoot.js';
import Header from './Header.jsx';
import Content from './Content.jsx';

const styles = () => ({
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(150deg, #263238 0%,#263238 50%,#1d262a 50%,#1d262a 100%)',
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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Catamaran:400,700" rel="stylesheet" />
        </Helmet>
        <Header />
        <Content />
      </div>
    );
  }
}

App.propTypes = {
  classes: object,
};

export default compose(
  withRoot,
  withStyles(styles),
)(App);
