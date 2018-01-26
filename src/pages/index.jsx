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
          <title>Prospero by C&amp;T</title>
          <link href="https://fonts.googleapis.com/css?family=Catamaran:400,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <meta charSet="utf-8" />
          <meta name="description" content="Prospero brings theatre and digital technology together brilliantly. It makes digital engagement easy." />
          <meta name="robots" content="index, nofollow" />
          <meta name="author" content="C&T" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@prosperodigit" />
          <meta name="twitter:title" content="Prospero by C&T" />
          <meta name="twitter:description" content="Prospero brings theatre and digital technology together brilliantly. It makes digital engagement easy. Build your own media-rich online learning resources in minutes, with ease. Expand your audience." />
          <meta name="twitter:image" content="http://prospero.digital/twitter.png" />
          <meta name="og:title" content="Prospero by C&T" />
          <meta name="og:image" content="http://prospero.digital/twitter.png" />
          <meta name="og:description" content="Prospero brings theatre and digital technology together brilliantly. It makes digital engagement easy. Build your own media-rich online learning resources in minutes, with ease. Expand your audience." />
          <meta name="og:url" content="http://prospero.digital" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#05adad" />
          <meta name="theme-color" content="#f9df23" />
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
