// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Header, Button } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './SizeGuide' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import SizeGuide from './SizeGuide';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  dataSize: PT.array,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  selectedSize: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  handleSelectSize: PT.func
}

class ProductSize extends React.Component {
  props: any;
  setState: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      clsActive: ''
    }
    this.activeSize = this.activeSize.bind(this);
  }
  activeSize(size: any){
    this.setState({
      clsActive: size
    })
  }
  render(){
    const {
      activeSize
    } = this;

    const {
      clsActive
    } = this.state;

    const {
      dataSize,
      selectedSize,
      handleSelectSize
    } = this.props;


    const itemsSizeBtn = dataSize.map(function(item: any,index: any){
      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button
          as='li'
          key={index}
          className={clsActive === item?'selected':''}
          onClick={ () => {
            handleSelectSize(item);
            activeSize(item);
          }}
        >
          {item}
        </Button>
      )
    })

    return(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div class="product-size">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h4'>Size:{" "}<span>{selectedSize}</span></Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button.Group as='ul'>
          {itemsSizeBtn}
        </Button.Group>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SizeGuide/>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ProductSize.propTypes = propTypes;

export default ProductSize;