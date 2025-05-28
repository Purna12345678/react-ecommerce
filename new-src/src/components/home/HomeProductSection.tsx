// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module '../header/ShowcaseHeader.js' was resolved ... Remove this comment to see the full error message
import ShowcaseHeader from '../header/ShowcaseHeader.js';
// @ts-expect-error TS(6142): Module '../main/ProductItem.js' was resolved to 'C... Remove this comment to see the full error message
import ProductItem from '../main/ProductItem.js';
import 'assets/style/product.scss';
import axios from 'axios';

class HomeProductSection extends Component {
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      dataHotSaleProduct: [{id:"Loading",category:"",type:"",name:"Loading",price:{marketPrice:1,salePrice:1},detail:{color:['red','blue'],size:['','','','',''],des:""},quantity:"",images:{imgProduct:"",imgModel:"",imgDetail:""}}],
      isReadMore: false
    }
    this.handleReadMoreProduct = this.handleReadMoreProduct.bind(this);
  }

  componentDidMount() {
    axios
    .get('/src/data/productData/hotSale.json')
    .then(res => {
      this.setState({dataHotSaleProduct: res.data})
    })
    .catch(err => console.log(err))
  }

  handleReadMoreProduct(){
    this.setState({
      isReadMore: true
    })
  }

  render() {

    const {
      isReadMore,
      dataHotSaleProduct
    } = this.state;

    let itemsProductCard = dataHotSaleProduct.map(function(item: any){
      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ProductItem
          key={item.id}
          {...item}
        />
      )
    })

    const btnReadMore = (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button
        className='load-more-btn'
        fluid
        onClick={this.handleReadMoreProduct}
      >
        READ MORE
      </Button>
    )

    let controllerReadMore = null ,itemsReadMoreProduct = null;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid id='hot-products' textAlign='center'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column width={13}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ShowcaseHeader
            headerMain='FEATURE PRODUCTS'
            headerSub='Best Collection fo You'
            iconHeader='gift'
          />
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div id="product-list">
            {itemsProductCard}
            {isReadMore?itemsProductCard:''}
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </div>
          {!isReadMore?btnReadMore:''}
        </Grid.Column>
      </Grid>
    )
  }
}

export default HomeProductSection;