import React, { Component, useState, useCallback } from 'react';
import { Icon, Dimmer } from 'semantic-ui-react';

export default function FooterSocialInfo() {
  const [active, setActive] = useState(null);
const handleOpen = useCallback(() => setActive(true), [/* TODO: Add dependencies */]);
const handleClose = useCallback(() => setActive(false), [/* TODO: Add dependencies */]);
return (
(
      <div class="social">
        <a href='https://github.com/tsejx'>
          <Icon link name='github' size='big'/>
        </a>
        <a href='http://weibo.com/mrsingsing'>
          <Icon link name='weibo' size='big'/>
        </a>
        <a onClick={this.handleOpen}>
          <Icon link name='weixin' size='big'/>
        </a>
        <Dimmer
          active={this.state.active}
          onClickOutside={this.handleClose}
          page
        >
          <img src="../../src/assets/img/qrcode.jpg" style={{width: 300,height:300}}/>
        </Dimmer>
      </div>
    )
);
}

export default FooterSocialInfo;