// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module './StepProgress' was resolved to 'C:/Users/... Remove this comment to see the full error message
import StepProgress from './StepProgress';
// @ts-expect-error TS(6142): Module './SigninStep' was resolved to 'C:/Users/PU... Remove this comment to see the full error message
import SigninStep from './SigninStep';
// @ts-expect-error TS(6142): Module './ConfirmStep' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ConfirmStep from './ConfirmStep';
// @ts-expect-error TS(6142): Module './BillDoneStep' was resolved to 'C:/Users/... Remove this comment to see the full error message
import BillDoneStep from './BillDoneStep';
import Scroll from '../scroll/Scroll';

import 'assets/style/cart.scss';
import 'assets/style/user.scss';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  isLogin: PT.bool,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  cart: PT.arrayOf(PT.object),
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  handleLogin: PT.func
}

class CartSite extends Component {
  props: any;
  setState: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isConfirm: false
    }
    this.handleBillDone = this.handleBillDone.bind(this);
  }
  componentDidMount() {
    Scroll(290,300);
  }
  handleBillDone(){
    this.setState({isConfirm: true})
  }
  render(){
    const {
      handleBillDone
    } = this;

    const {
      isConfirm
    } = this.state;

    const {
      cart,
      isLogin,
      handleLogin
    } = this.props;

    let steps = [
      { completed: isLogin, active: !isLogin, title: 'SIGNIN', icon: 'id card outline'},
      { completed: isConfirm, active: isLogin && !isConfirm, title: 'CONFIRM ORDER', icon: 'idea'},
      { completed: isConfirm, active: false, title: 'THANK YOU', icon:'truck'}
    ];

    let displayContainer = null;

    if(!isLogin){
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      displayContainer = <SigninStep cart={cart} isLogin={isLogin} handleLogin={handleLogin}/>;
    }else if(!isConfirm){
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      displayContainer = <ConfirmStep cart={cart} handleBillDone={handleBillDone}/>;
    }else{
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      displayContainer = <Route component={BillDoneStep}/>;
    }

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid textAlign='center'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StepProgress steps={steps}/>
        {displayContainer}
      </Grid>
    )
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
CartSite.propTypes = propTypes;

export default CartSite;