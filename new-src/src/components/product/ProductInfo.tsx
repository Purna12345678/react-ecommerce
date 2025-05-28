// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid,  } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductImages' was resolved to 'C:/Users... Remove this comment to see the full error message
import ProductImages from './ProductImages';
// @ts-expect-error TS(6142): Module './ProductHeader' was resolved to 'C:/Users... Remove this comment to see the full error message
import ProductHeader from './ProductHeader';
// @ts-expect-error TS(6142): Module './ProductColor' was resolved to 'C:/Users/... Remove this comment to see the full error message
import ProductColor from './ProductColor';
// @ts-expect-error TS(6142): Module './ProductSize' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ProductSize from './ProductSize';
// @ts-expect-error TS(6142): Module './ProductCount' was resolved to 'C:/Users/... Remove this comment to see the full error message
import ProductCount from './ProductCount';
// @ts-expect-error TS(6142): Module './ProductDetail' was resolved to 'C:/Users... Remove this comment to see the full error message
import ProductDetail from './ProductDetail';
import axios from 'axios';

class ProductInfo extends React.Component {
  props: any;
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      selectedColor: 'Please Select Color',
      selectedSize: 'Please Select Size',
      dataProInfo: {id:"Loading",category:"",type:"",name:"Loading",price:{marketPrice:"",salePrice:"Loading"},detail:{color:['red','blue'],size:['','','','',''],des:""},quantity:"",images:{imgProduct:"",imgModel:"",imgDetail:""}},
      canAddToCart: true
    }
    this.handleSelectColor = this.handleSelectColor.bind(this);
    this.handleSelectSize = this.handleSelectSize.bind(this);
    this.handleAddOnceToCart = this.handleAddOnceToCart.bind(this);
  }

  handleSelectColor(value: any){
    value = value.replace(/^[a-z]?/,function($0: any){
        return $0.toUpperCase();
      })
    this.setState({
      selectedColor: value
    })
  }

  handleSelectSize(value: any){
    this.setState({
      selectedSize: value.toUpperCase()
    })
  }

  componentDidMount(){
    const arrPath = this.props.location.pathname.substr(1).split('/');

    const pathCategory = '/src/data/productData/' + arrPath[0] + '/' + arrPath[1] + '.json';

    const idProduct = arrPath[2];

    axios
    .get(pathCategory)
    .then(res => {
      let dataTemp = {};
      res.data.forEach(function(item: any,index: any){
        if (item.id === idProduct) {
          dataTemp = JSON.parse(JSON.stringify(item));
        }
      })
      this.setState({
        dataProInfo: dataTemp
      })

    })
    .catch(err => console.log(err))
  }

  handleAddOnceToCart(){
    this.setState({canAddToCart: false})
  }

  render(){

    const {
      handleSelectColor,
      handleSelectSize,
      handleAddOnceToCart
    } = this;

    const {
      selectedColor,
      selectedSize,
      dataProInfo,
      canAddToCart
    } = this.state;

    const proInfo = {
      id: dataProInfo.id*1,
      name: dataProInfo.name,
      salePrice: dataProInfo.price.salePrice,
      srcImg: dataProInfo.images.imgProduct,
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    }

    let hasSelected  = false;

    if (selectedColor !== 'Please Select Color' && selectedSize !=='Please Select Size') {
      hasSelected  = true;
    }

    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Row>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column width={6}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductImages img={dataProInfo.images.imgProduct}/>
        </Grid.Column>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column id="product-info" width={6} textAlign='left'>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductHeader
              name={dataProInfo.name}
              price={dataProInfo.price}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductColor
              dataColor={dataProInfo.detail.color}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductSize
              dataSize={dataProInfo.detail.size}
              selectedSize={selectedSize}
              handleSelectSize={handleSelectSize}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductDetail
              dataDes={dataProInfo.detail.des}
              canAddToCart={canAddToCart}
              hasSelected={hasSelected}
              handleAddToCart={this.props.handleAddToCart}
              handleAddOnceToCart={handleAddOnceToCart}
              proInfo={proInfo}
            />
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default ProductInfo;