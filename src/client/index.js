import React from 'react';
import Helmet from 'react-helmet';

import HelloWorld from './HelloWorld';
import config from '../../config';

export default function TestApp() {
  return (
    <div>
      <Helmet>
        <html lang="nl" />
        <title>{config('htmlPage.defaultTitle')}</title>
        <meta name="application-name" content={config('htmlPage.defaultTitle')} />
        <meta name="description" content={config('htmlPage.defaultDescription')} />
      </Helmet>
      <HelloWorld />
    </div>
  );
}
