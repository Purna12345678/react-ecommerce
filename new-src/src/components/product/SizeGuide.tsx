// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useState, useEffect } from 'react';
import { Header, Image, Modal } from 'semantic-ui-react'
import '../../util/mockSizeGuide.js';
import axios from 'axios';

function SizeGuide(this: any, props: any) {
  const [state, setState] = useState({
    dataSizeGuide:{}
  });

  useEffect(() => {
    axios
    .get('/sizeguide')
    .then(res => this.setState({dataSizeGuide: res.data.data[0]}))
    .catch(err => console.log(err))
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Modal trigger={<a className='product-size-guide'>SIZE GUIDE</a>}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Modal.Header>Size Guide</Modal.Header>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Modal.Content image>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Image wrapped size='big' src={this.state.dataSizeGuide.image} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Modal.Description>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header>Men</Header>
          {this.state.dataSizeGuide.des}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default SizeGuide;