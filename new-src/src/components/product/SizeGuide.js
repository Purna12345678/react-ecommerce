import React, { useState, useEffect } from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import '../../util/mockSizeGuide.js';
import axios from 'axios';

export default function SizeGuide() {
  const [dataSizeGuide, setDataSizeGuide] = useState(null);
return (
(
      <Modal trigger={<a className='product-size-guide'>SIZE GUIDE</a>}>
        <Modal.Header>Size Guide</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='big' src={this.state.dataSizeGuide.image} />
          <Modal.Description>
            <Header>Men</Header>
            {dataSizeGuide.des}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
);
}

export default SizeGuide;