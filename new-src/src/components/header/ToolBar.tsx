// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module '../popup/PopupLogin' was resolved to 'C:/U... Remove this comment to see the full error message
import PopupLogin from '../popup/PopupLogin';
// @ts-expect-error TS(6142): Module '../popup/PopupCart' was resolved to 'C:/Us... Remove this comment to see the full error message
import PopupCart from '../popup/PopupCart';

const dataToolBtnsRight = [
  {
    title: 'sign-in',
    icon: 'user'
  },
  {
    title: 'favorite',
    icon: 'heart'
  },
  {
    title: 'message',
    icon: 'mail'
  },
  {
    title: 'cart',
    icon: 'shop'
  }
];

// Tool Button 工具栏按钮
const ToolBtn = (index: any,feature: any,icon: any) => (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Button className="tool-btn" animated='fade' floated='right' tabIndex={index}>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button.Content as='span' hidden>{feature}</Button.Content>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button.Content as='span' visible>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Icon name={icon} />
    </Button.Content>
  </Button>
)

const ToolBar = (props: any) => {
  let itemsToolRight = dataToolBtnsRight.map(function(item,index){
    let title = item.title
      .replace(/\-/g,' ')
      .replace(/^[a-z]?/,function($0){
        return $0.toUpperCase();
      })

    let popupWrap = null;

    let btnTool = ToolBtn(index,title,item.icon);

    switch(item.title){
      case 'sign-in':
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        popupWrap = (<PopupLogin btnTool={btnTool}/>);
        break;
      case 'favorite':
        popupWrap = (btnTool);
        break;
      case 'message':
        popupWrap = (btnTool);
        break;
      case 'cart':
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        popupWrap = (<PopupCart cart={props.cart} btnTool={btnTool}/>);
        break;
    }
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu.Item key={index} as='li'>
        {popupWrap}
      </Menu.Item>
    )
  })

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Menu.Menu as='ul'>
      {itemsToolRight}
    </Menu.Menu>
  )
}

export default ToolBar;