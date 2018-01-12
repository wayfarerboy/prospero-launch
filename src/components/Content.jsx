import React from 'react';
import Helmet from 'react-helmet';

import Carousel from './Carousel.jsx';
import CopyText from './CopyText.jsx';

import { carousels, body } from '../content/data.js';

const Content = ({ className }) => (
  <div className={className}>
    <Helmet>
      <title>Prospero</title>
    </Helmet>
    <Carousel items={carousels[0]} name="carousel1" />
    <CopyText item={body[0]} name="text1" />
    <Carousel items={carousels[1]} name="carousel2" />
    <CopyText item={body[1]} name="text2" />
    <Carousel items={carousels[2]} name="carousel3" />
    <CopyText item={body[2]} name="text3" />
    <Carousel items={carousels[3]} name="carousel4" />
    <CopyText item={body[3]} name="text4" />
  </div>
);

Content.displayName = 'Content';

export default Content;
