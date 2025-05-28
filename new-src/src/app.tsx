// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { createRoot } from 'react-dom/client';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom';
// @ts-expect-error TS(6142): Module './router/Route' was resolved to 'C:/Users/... Remove this comment to see the full error message
import RouteApp from './router/Route'; //路由配置
import 'semantic-ui-css/semantic.css';// semantic-ui 样式
import 'assets/style/reset.scss';

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
createRoot(document.getElementById('root')).render(<RouteApp/>);

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
if (module.hot) {
  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.hot.accept();
}