// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module '../user/LoginForm' was resolved to 'C:/Use... Remove this comment to see the full error message
import LoginForm from '../user/LoginForm';
// @ts-expect-error TS(6142): Module '../user/NewCustomer' was resolved to 'C:/U... Remove this comment to see the full error message
import NewCustomer from '../user/NewCustomer';
// @ts-expect-error TS(6142): Module './OrderBar' was resolved to 'C:/Users/PUYa... Remove this comment to see the full error message
import OrderBar from './OrderBar';

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const SigninStep = (props: any) => <Grid.Row id='checkout'>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Grid.Column id='checkout-controller' width='8' textAlign='left'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Header as='h2' className='controller-header' content='SIGN IN' dividing/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid className='control-wrap'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <LoginForm isLogin={props.isLogin} handleLogin={props.handleLogin}/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <NewCustomer/>
    </Grid>
  </Grid.Column>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <OrderBar cart={props.cart}/>
</Grid.Row>;

export default SigninStep;