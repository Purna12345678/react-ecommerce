// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
const ShowcaseHeader = (props: any) => {

  const {
    iconHeader,
    headerMain,
    headerSub
  } = props;

  let showIcon = null;

  if (!!iconHeader) {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    showIcon = (<Icon name={iconHeader} />)
  }

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Header
      as='h2'
      textAlign='center'
      icon
    >
      {showIcon}
      {headerMain}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header.Subheader>
        {headerSub}
      </Header.Subheader>
    </Header>
  )
}
export default ShowcaseHeader;
