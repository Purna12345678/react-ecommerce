import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

export function BillDoneStep() {  return (
(
      <Grid.Row id='checkout'>
        <Grid.Column id='checkout-controller' width='12' textAlign='center'>
          <Header as='h2' className='controller-header' content='THANK YOU FOR SHOPPING WITH US'/>
          <p className='billdone-tips'>This page will jump to home page in {seconds} seconds,or click <Link to='/'>HERE</Link> to jump.</p>
        </Grid.Column>
      </Grid.Row>
    )
);
}

export default BillDoneStep;