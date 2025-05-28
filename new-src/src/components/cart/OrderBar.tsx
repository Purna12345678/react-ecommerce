// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid, Header, Item } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module './OrderItem' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import OrderItem from './OrderItem';
// @ts-expect-error TS(6142): Module './OrderBill' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import OrderBill from './OrderBill';

const OrderBar = (props: any) => {
  const {
    cart
  } = props;

  let valueTotal = 0;

  const itemsOrder = cart.map(function(item: any,index: any){
    valueTotal += item.quantity * item.salePrice;
    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <OrderItem key={item.id} {...item}/>
    )
  });

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid.Column id='order-bar' as='aside' width='4' textAlign='left'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header as='h2' className='order-header' content='YOUR ORDER' dividing/>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Item.Group divided>
        {itemsOrder}
      </Item.Group>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <OrderBill orderValue={valueTotal}/>
    </Grid.Column>
  )
}

export default OrderBar;