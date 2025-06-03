import React, { useCallback } from 'react';
import { Header, Button } from 'semantic-ui-react';
import SizeGuide from './SizeGuide';

export default function ProductSize() {const activeSize = useCallback((size) => this.setState({
      clsActive: size
    }), [/* TODO: Add dependencies */]);
return (
(
        <Button
          as='li'
          key={index}
          className={clsActive === item?'selected':''}
          onClick={ () => {
            handleSelectSize(item);
            activeSize(item);
          }}
        >
          {item}
        </Button>
      )
);
}

export default ProductSize;