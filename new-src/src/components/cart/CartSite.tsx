// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback, useEffect } from 'react';
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

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function CartSite(this: any) {const handleBillDone = useCallback(() => this.setState({isConfirm: true}), [/* TODO: Add dependencies */]);
return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid textAlign='center'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StepProgress steps={steps}/>
        // @ts-expect-error TS(2304): Cannot find name 'displayContainer'.
        {displayContainer}
      </Grid>
    )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default CartSite;