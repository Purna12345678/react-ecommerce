import React, { Component, useCallback, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import StepProgress from './StepProgress';
import SigninStep from './SigninStep';
import ConfirmStep from './ConfirmStep';
import BillDoneStep from './BillDoneStep';
import Scroll from '../scroll/Scroll';

import 'assets/style/cart.scss';
import 'assets/style/user.scss';

export default function CartSite() {const handleBillDone = useCallback(() => this.setState({isConfirm: true}), [/* TODO: Add dependencies */]);
return (
(
      <Grid textAlign='center'>
        <StepProgress steps={steps}/>
        {displayContainer}
      </Grid>
    )
);
}

export default CartSite;