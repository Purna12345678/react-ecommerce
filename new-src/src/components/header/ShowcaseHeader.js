import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
const ShowcaseHeader = (props) => {

  const {
    iconHeader,
    headerMain,
    headerSub
  } = props;

  let showIcon = null;

  if (!!iconHeader) {
    showIcon = (<Icon name={iconHeader} />)
  }

  return(
    <Header
      as='h2'
      textAlign='center'
      icon
    >
      {showIcon}
      {headerMain}
      <Header.Subheader>
        {headerSub}
      </Header.Subheader>
    </Header>
  )
}
export default ShowcaseHeader;
