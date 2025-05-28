// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  dataColor: PT.array,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  selectedColor: PT.string,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  handleSelectColor: PT.func
}

class ProductColor extends Component {
  props: any;
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      clsActive: ''
    }
    this.activeColor = this.activeColor.bind(this);
  }

  activeColor(color: any){
    this.setState({
      clsActive: color
    })
  }

  render(){
    const {
      activeColor
    } = this;

    const {
      clsActive
    } = this.state;

    const {
      dataColor,
      selectedColor,
      handleSelectColor
    } = this.props;

    const itemsColorBtn = dataColor.map(function(item: any,index: any){
      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button
          as='li'
          disabled={false}
          key={index}
          className={clsActive === item ?'selected':''}
          color={item}
          onClick={() => {
            handleSelectColor(item)
            activeColor(item);
          }}
        ></Button>
      )
    })

    return(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div class="product-color">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h4'>Color:{" "}<span>{selectedColor}</span></Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button.Group as='ul' size='small'>
          {itemsColorBtn}
        </Button.Group>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ProductColor.propTypes = propTypes;

export default ProductColor;