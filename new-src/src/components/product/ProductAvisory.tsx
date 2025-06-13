// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react'
import { Grid, Divider, Accordion } from 'semantic-ui-react'

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const ProductAvisory = (props: any) => <Grid.Column id='product-avisory' width={12}>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Divider horizontal><span>Product Avisory</span></Divider>
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Accordion panels={props.dataAvisory}/>
</Grid.Column>

export default ProductAvisory;