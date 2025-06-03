import React, { useCallback } from 'react';
import { Form, Header, Button, Dimmer, Popup } from 'semantic-ui-react';
import axios from 'axios';
import 'assets/style/user.scss';

export default function LoginForm() {const handleOpen = useCallback(() => this.setState({active: true}), [/* TODO: Add dependencies */]);
const handleClose = useCallback(() => this.setState({active: false}), [/* TODO: Add dependencies */]);
const changeMail = useCallback((e) => this.setState({email: e.target.value});
[/* TODO: Add dependencies */]
;
const changePassword = useCallback((e) => this.setState({password: e.target.value});
[/* TODO: Add dependencies */]
;
return (
(
      <div className='login-form'>
        <Header as='h4'>
          SIGN IN
          <Header.Subheader>
            Sign in to be continue.
          </Header.Subheader>
        </Header>
        <Form>
          <Form.Field
            label='*Email'
            control='input'
            placeholder='Email'
            onChange={changeMail}
          />
          <Form.Field
            label='*Password'
            control='input'
            type='password'
            placeholder='Password'
            onChange={changePassword}
          />
          <Popup
            trigger={<Button
                        type='submit'
                        color='black'
                        onClick={()=>{handleLogin(email,password)}
                      }>LOGIN</Button>}
            content={isLogin?'You have successfully logged in.':'Your e-mail and password are wrong , please check again.'}
            on='click'
            hideOnScroll
            inverted
          />
          <a onClick={this.handleOpen}>
            Forgotten password?
          </a>
        </Form>
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
        Email : guest
        <br/>
        Password : 01234
        </Dimmer>
      </div>
    )
);
}

export default LoginForm;