// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Item } from 'semantic-ui-react';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  id: PT.number,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  name: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  marketPrice: PT.number,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  salePrice: PT.number,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  srcImg: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  color: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  size: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  quantity: PT.number
}

const OrderItem = (props: any) => {
  const {
    name,
    salePrice,
    srcImg,
    color,
    size,
    quantity
  } = props;

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Item>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Item.Image src={srcImg} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Item.Content className='item-content'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Item.Header as='h3'>{name}</Item.Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Item.Header as='h4'>${salePrice}</Item.Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Item.Meta>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span>Quantity: {quantity}</span>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span>Color: {color}</span>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span>Size: {size}</span>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span>Total: ${quantity*salePrice}</span>
        </Item.Meta>
      </Item.Content>
    </Item>
  )
}

OrderItem.propTypes = propTypes;

export default OrderItem;