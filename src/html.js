import React from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Prospero brings theatre and digital technology together brilliantly. It makes digital engagement easy." />
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
          <link href="https://fonts.googleapis.com/css?family=Catamaran:400,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#05adad" />
          <meta name="theme-color" content="#f9df23" />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
