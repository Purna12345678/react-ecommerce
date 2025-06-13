// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Divider } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './FooterMenu' was resolved to 'C:/Users/PU... Remove this comment to see the full error message
import FootMenu from './FooterMenu';
// @ts-expect-error TS(6142): Module './FooterSocialInfo' was resolved to 'C:/Us... Remove this comment to see the full error message
import FooterSocialInfo from './FooterSocialInfo';
import FooterCopyright from './FooterCopyright';
import 'assets/style/footer.scss';

const Footer = () => (
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  <footer id='footer'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FootMenu/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Divider section/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FooterSocialInfo/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FooterCopyright/>
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  </footer>
)

export default Footer;