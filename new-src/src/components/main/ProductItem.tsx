// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

let propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  id: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  category: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  type: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  name: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  price: PT.objectOf(PT.number),
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  images: PT.object
}

const ProductItem = (props: any) => {

  let {
    id,
    category,
    type,
    name,
    price:{
      marketPrice,
      salePrice
    },
    images
  } = props;

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card className='product-info'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link to={`/${category}/${type}/${id}`} >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Image className='pro-images' src={images.imgProduct} />
      </Link>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Card.Content className='pro-info'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card.Header as='h4'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link to={`/${category}/${type}/${id}`}>
            {name}
          </Link>
        </Card.Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card.Meta>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className='market-price'>
            ${marketPrice}
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </span>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className='sale-price'>
            ${salePrice}
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </span>
        </Card.Meta>
      </Card.Content>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Card.Content extra className='pro-tool'>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <a className='add-wishlist'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon name='heart' />
          Add Wishlist
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </a>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Link to={`/${category}/${type}/${id}`} className='add-cart'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon name='shop' />
          Add Cart
        </Link>
      </Card.Content>
    </Card>
  )
}

ProductItem.propTypes = propTypes;

export default ProductItem;