// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { List, Divider } from 'semantic-ui-react';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  orderValue: PT.number
}

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const OrderBill = (props: any) => <List className='order-bill'>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <List.Item as='li'><span>ORDER VALUE:</span><span>${props.orderValue.toFixed(2)}</span></List.Item>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <List.Item as='li'><span>DELIVERY</span><span>$10.00</span></List.Item>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <List.Item as='li'><Divider/></List.Item>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <List.Item as='li'><span>TOTAL</span><span>${(props.orderValue+10).toFixed(2)}</span></List.Item>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <List.Item as='li'>30 days withdrawal. </List.Item>
</List>

OrderBill.propTypes = propTypes;

export default OrderBill;