// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module './ConfirmOrder' was resolved to 'C:/Users/... Remove this comment to see the full error message
import ConfirmOrder from './ConfirmOrder';
// @ts-expect-error TS(6142): Module './OrderBar' was resolved to 'C:/Users/PUYa... Remove this comment to see the full error message
import OrderBar from './OrderBar';
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const ConfirmStep = (props: any) => <Grid.Row id='checkout'>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Grid.Column id='checkout-controller' width='8' textAlign='left'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Header as='h2' className='controller-header' content='CONFIRM ORDER' dividing/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ConfirmOrder/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button
      className='confrim-btn'
      color='black'
      content='COMPLETE PURCHASE'
      onClick={()=>props.handleBillDone()}
    />
  </Grid.Column>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <OrderBar cart={props.cart}/>
</Grid.Row>
export default ConfirmStep;