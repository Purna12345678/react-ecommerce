// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Button, Icon, Tab, Popup } from 'semantic-ui-react';
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const Delivery = (props: any) => <Tab.Pane>
  Delivery: Shipping is available to residential address or other address in Mainland China, in accordance with your selected delivery option. Unfortunately we are unable to deliver to Hong Kong, Macau or Taiwan. Payment: We accept card payments via MasterCard and Visa. You can also select to pay by Alipay, Bank transfer, China Union Pay via Online or Telephone or H&M giftcard.
</Tab.Pane>

const ProductDeatail = (props: any) => {
  const panes = [
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { menuItem: 'DESCRIPTION', render: () => <Tab.Pane>{props.dataDes}</Tab.Pane> },
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { menuItem: 'DETAILS', render: () => <Tab.Pane>NO DETAIL</Tab.Pane> },
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { menuItem: 'SHARE', render: () => <Tab.Pane>NO SHARE</Tab.Pane> },
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { menuItem: 'DELIVERY', render: () => <Delivery/> },
  ];

  let {
    proInfo,
    hasSelected,
    canAddToCart,
    handleAddToCart,
    handleAddOnceToCart
  } = props;

  const btnAddToCart = (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button as='button' disabled={!canAddToCart} className='add-to-cart' icon onClick={()=>{
      if (!hasSelected || !canAddToCart) return;
      handleAddToCart(proInfo);
      handleAddOnceToCart();
    }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Icon name='shopping bag' />
      ADD TO SHOPPING CART
    </Button>
  )

  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="product-detail">
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span className='delivers'>Delivers in: <strong>1-7 working days</strong></span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Popup
        trigger={btnAddToCart}
        content={hasSelected?'Successfully added to the shopping cart , but regretly to tell you that you just can buy this product once.':'Color and size must be selected.'}
        on='click'
        hideOnScroll
        inverted
      />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button as='button' className='save-as-favourite' icon>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Icon name='empty heart'/>
        SAVE AS FAVOURITE
      </Button>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Tab menu={{ attached: 'top' }} panes={panes} />
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}
export default ProductDeatail;