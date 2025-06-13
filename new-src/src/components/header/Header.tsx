// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Route } from 'react-router-dom';
// @ts-expect-error TS(6142): Module './HeaderToolWrapper' was resolved to 'C:/U... Remove this comment to see the full error message
import HeaderToolWrapper from './HeaderToolWrapper';
// @ts-expect-error TS(6142): Module './HeaderBrand' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import HeaderBrand from './HeaderBrand';
// @ts-expect-error TS(6142): Module '../nav/HeaderMenu.js' was resolved to 'C:/... Remove this comment to see the full error message
import HeaderNavigation from '../nav/HeaderMenu.js';
// @ts-expect-error TS(6142): Module './HeaderDivider' was resolved to 'C:/Users... Remove this comment to see the full error message
import HeaderDivider from './HeaderDivider';
import 'assets/style/header.scss';
const Header = (props: any) => {
  let {
    location: {
      pathname
    },
    cart
  } = props;
  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <header>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <HeaderToolWrapper cart={cart}/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <HeaderBrand/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Route component={HeaderNavigation}/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {pathname !== '/'? <Route component={HeaderDivider}/> : '' }
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </header>
  )
}
export default Header;