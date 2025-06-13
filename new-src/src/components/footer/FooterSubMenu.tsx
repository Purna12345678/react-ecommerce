// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Link } from 'react-router-dom';
const FooterSubMenu = (props: any) => {
  let {
    menuHeader,
    menuItems
  } = props;

  let itemsSubMenuItem = menuItems.map(function(item: any,index: any){

    const link = item.link
    .replace(/\bigo/g,'iGo')
    .replace(/\-/g,' ')
    .replace(/^[a-z]?/,function($0: any){
      return $0.toUpperCase();
    })
    .replace(/\&[a-z]?/g,function($0: any){
      const s = $0.substring(1).toUpperCase();
      return ' & ' + s;
    });

    return(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <li key={index} className="ft-submenu-item">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Link className='ft-submenu-link' to={item.path}>{link}</Link>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </li>
    )
  })

  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <h4 className='ft-submenu-header'>{menuHeader.toUpperCase()}</h4>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <ul className="ft-submenu-list">
        {itemsSubMenuItem}
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </ul>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}
export default FooterSubMenu;