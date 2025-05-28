// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Form, Header, Button, Dimmer, Popup } from 'semantic-ui-react';
import axios from 'axios';
import 'assets/style/user.scss';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  handleLogin: PT.func,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  isLogin: PT.bool
}

class LoginForm extends React.Component {
  props: any;
  setState: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      active: false,
      email:'',
      password:''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeMail = this.changeMail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  handleOpen(){
    this.setState({active: true})
  }
  handleClose(){
    this.setState({active: false})
  }
  changeMail(e: any){
    this.setState({email: e.target.value});
  }
  changePassword(e: any){
    this.setState({password: e.target.value});
  }
  render() {
    let {
      active,
      email,
      password
    } = this.state;

    let {
      changeMail,
      changePassword
    } = this;

    let {
      isLogin,
      handleLogin
    } = this.props;

    return(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className='login-form'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h4'>
          SIGN IN
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header.Subheader>
            Sign in to be continue.
          </Header.Subheader>
        </Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Form>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            label='*Email'
            control='input'
            placeholder='Email'
            onChange={changeMail}
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            label='*Password'
            control='input'
            type='password'
            placeholder='Password'
            onChange={changePassword}
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Popup
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <a onClick={this.handleOpen}>
            Forgotten password?
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </a>
        </Form>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
        Email : guest
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <br/>
        Password : 01234
        </Dimmer>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
  }
}

export default LoginForm;