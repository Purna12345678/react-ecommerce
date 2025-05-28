// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Grid, Header, Step } from 'semantic-ui-react';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  steps: PT.arrayOf(PT.object)
}

const StepProgress = (props: any) => {
  return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Column width='12'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h1' content='CHECKOUT'/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Step.Group items={props.steps} />
      </Grid.Column>
  )
}

StepProgress.propTypes = propTypes;

export default StepProgress;