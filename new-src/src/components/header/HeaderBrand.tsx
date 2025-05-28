// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';



const HeaderBrand = () => (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  (<Header as='hgroup' id="header-brand" icon textAlign='center'>// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header.Content as='h1' className='brand-logo'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link to='/'>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <img src={require('../../assets/img/logo.png')} alt="iGo"/>
      </Link>
    </Header.Content>// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header.Content as='h3' className='brand-des'>
      A pursuit of exquisite e-commerce platform.
    </Header.Content>
  </Header>)
)

export default HeaderBrand;