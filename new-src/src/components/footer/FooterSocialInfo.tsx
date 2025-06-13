// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useCallback } from 'react';
import { Icon, Dimmer } from 'semantic-ui-react';

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function FooterSocialInfo(this: any) {
  const [active, setActive] = useState(null);
const handleOpen = useCallback(() => setActive(true), [/* TODO: Add dependencies */]);
const handleClose = useCallback(() => setActive(false), [/* TODO: Add dependencies */]);
return (
(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div class="social">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <a href='https://github.com/tsejx'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon link name='github' size='big'/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </a>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <a href='http://weibo.com/mrsingsing'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon link name='weibo' size='big'/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </a>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <a onClick={this.handleOpen}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon link name='weixin' size='big'/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </a>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dimmer
          active={this.state.active}
          onClickOutside={this.handleClose}
          page
        >
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <img src="../../src/assets/img/qrcode.jpg" style={{width: 300,height:300}}/>
        </Dimmer>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default FooterSocialInfo;