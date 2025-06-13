// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

export function BillDoneStep() {  return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Row id='checkout'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column id='checkout-controller' width='12' textAlign='center'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header as='h2' className='controller-header' content='THANK YOU FOR SHOPPING WITH US'/>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <p className='billdone-tips'>This page will jump to home page in {seconds} seconds,or click <Link to='/'>HERE</Link> to jump.</p>
        </Grid.Column>
      </Grid.Row>
    )
);
}

export default BillDoneStep;