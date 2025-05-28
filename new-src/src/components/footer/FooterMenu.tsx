// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './FooterSubMenu' was resolved to 'C:/Users... Remove this comment to see the full error message
import FooterSubMenu from './FooterSubMenu';
// @ts-expect-error TS(6142): Module './SubscribeMenu' was resolved to 'C:/Users... Remove this comment to see the full error message
import SubscribeMenu from './SubscribeMenu';

// Footer Submenu Text Data 底部子菜单显示文本的数据
const dataFooterMenu = [
  {
    menuHeader: 'shop',
    menuItems: [
      {
        link: 'ladies',
        path: '/ladies'
      },
      {
        link: 'men',
        path: '/men'
      },
      {
        link: 'kids',
        path: '/kids'
      },
      {
        link: 'home',
        path: '/'
      }
    ]
  },
  {
    menuHeader: 'carporate info',
    menuItems: [
      {
        link: 'career-at-igo',
        path: '/'
      },
      {
        link: 'about-igo',
        path: '/'
      },
      {
        link: 'sustainability',
        path: '/'
      },
      {
        link: 'press',
        path: '/'
      },
      {
        link: 'investor-relations',
        path: '/'
      },
      {
        link: 'corporate-governance',
        path: '/'
      }
    ]
  },
  {
    menuHeader: 'help',
    menuItems: [
      {
        link: 'customer-service',
        path: '/'
      },
      {
        link: 'my-igo',
        path: ''
      },
      {
        link: 'store-locator',
        path: '/'
      },
      {
        link: 'legal&privacy',
        path: '/'
      },
      {
        link: 'contact',
        path: '/'
      }
    ]
  }
]

const FootMenu = (props: any) => {
  let itemsSubMenu = dataFooterMenu.map(function(item,index){
    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Column key={index}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FooterSubMenu {...item}/>
      </Grid.Column>
    )
  })

  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="footer-menu">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid columns='four' divided>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Grid.Row>
            {itemsSubMenu}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SubscribeMenu/>
          </Grid.Row>
        </Grid>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}

export default FootMenu;