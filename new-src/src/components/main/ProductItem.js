import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
const ProductItem = (props) => {

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
    <Card className='product-info'>
      <Link to={`/${category}/${type}/${id}`} >
        <Image className='pro-images' src={images.imgProduct} />
      </Link>
      <Card.Content className='pro-info'>
        <Card.Header as='h4'>
          <Link to={`/${category}/${type}/${id}`}>
            {name}
          </Link>
        </Card.Header>
        <Card.Meta>
          <span className='market-price'>
            ${marketPrice}
          </span>
          <span className='sale-price'>
            ${salePrice}
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra className='pro-tool'>
        <a className='add-wishlist'>
          <Icon name='heart' />
          Add Wishlist
        </a>
        <Link to={`/${category}/${type}/${id}`} className='add-cart'>
          <Icon name='shop' />
          Add Cart
        </Link>
      </Card.Content>
    </Card>
  )
}
export default ProductItem;