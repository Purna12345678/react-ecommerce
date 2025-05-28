// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useEffect } from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './LoginForm' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import LoginForm from './LoginForm';
// @ts-expect-error TS(6142): Module './NewCustomer' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import NewCustomer from'./NewCustomer';
import Scroll from '../scroll/Scroll';
import 'assets/style/user.scss';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  handleLogin: PT.func,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  isLogin: PT.bool
}

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const LoginFormWrap = (props: any) => <Grid textAlign='center'>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Grid.Column width={4} textAlign='left'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <LoginForm handleLogin={props.handleLogin}/>
  </Grid.Column>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Grid.Column width={4} textAlign='left'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <NewCustomer/>
  </Grid.Column>
</Grid>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const LoginDoneWrap = (props: any) => <Grid className='login-success' textAlign='center'>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Message size='huge' positive>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Message.Header>You have successfully logged in.</Message.Header>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <p>Now you can go to the mall to buy your favorite clothes</p>
  </Message>
</Grid>

function LoginSite(this: any, props: any) {
  useEffect(() => {
    Scroll(230,300);
  }, []);

  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div id='login-wrap'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      { this.props.isLogin ? <LoginDoneWrap/>:<LoginFormWrap isLogin={this.props.isLogin} handleLogin={this.props.handleLogin}/>}
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}

LoginSite.propTypes = propTypes;

export default LoginSite;