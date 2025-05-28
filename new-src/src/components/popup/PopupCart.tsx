// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Link } from 'react-router-dom';
import { Popup, Item } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module '../cart/OrderItem' was resolved to 'C:/Use... Remove this comment to see the full error message
import OrderItem from '../cart/OrderItem';
// @ts-expect-error TS(6142): Module '../cart/OrderBill' was resolved to 'C:/Use... Remove this comment to see the full error message
import OrderBill from '../cart/OrderBill';
import 'assets/style/cart.scss';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  btnTool: PT.element
}

const PopupCart = (props: any) => {
    let {
      cart,
      btnTool
    } = props;

    let valueTotal = 0;

    const itemsOrder = cart.map(function(item: any,index: any){

      valueTotal += item.salePrice * item.quantity;

      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <OrderItem key={item.id} {...item}/>
      )
    })

    const conHasPro = (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className='popup-cart'>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Item.Group id='cart-window' divided>
          {itemsOrder}
        </Item.Group>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <OrderBill orderValue={valueTotal}/>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Link
          className='checkout-btn'
          to='/cart'
        >
          CHECKOUT
        </Link>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )

    const conNoPro = (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={'up-cart' + ' ' + 'no-pro'}>Your shopping bag is empty!</div>
    )

    const displayPopupCart = !cart.length ? conNoPro:conHasPro;

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Popup trigger={btnTool} position='bottom center' hoverable>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Popup.Content>
        {displayPopupCart}
      </Popup.Content>
    </Popup>
  )
}

PopupCart.propTypes = propTypes;

export default PopupCart;