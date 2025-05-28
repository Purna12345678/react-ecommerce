// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

const HeaderDivider = (props: any) => {

  const secondary = props.location.pathname.match(/\/[a-z]+/)[0].substr(1);

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Divider id='header-divider' horizontal>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link to='/'>iGo.com</Link>
      {" / "}
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span>{secondary}</span>
    </Divider>
  )
}

export default HeaderDivider;