// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useEffect } from 'react';
import { Grid, Header, Form, Button, Checkbox } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';
import 'assets/style/user.scss';

function RegisterSite(props: any) {
  useEffect(() => {
    Scroll(230,300);
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid id='join-container' textAlign='center'>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Column width={4} textAlign='left'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h3'>
          JOIN US
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header.Subheader>
            Enter following details here.
          </Header.Subheader>
        </Header>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Form>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            label='Email'
            control='input'
            placeholder='Email'
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            label='Password'
            control='input'
            type='password'
            placeholder='Password'
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            label='Repeat Password'
            control='input'
            type='password'
            placeholder='Repeat Password'
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form.Field
            control={Checkbox}
            label={{ children: 'Yes,I consent to the Privacy policy.' }}
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button type='submit' color='black'>JOIN US</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default RegisterSite;