import React, { Component, useCallback } from 'react';
import { Header, Button } from 'semantic-ui-react';

export default function ProductColor() {const activeColor = useCallback((color) => this.setState({
      clsActive: color
    }), [/* TODO: Add dependencies */]);
return (
(
        <Button
          as='li'
          disabled={false}
          key={index}
          className={clsActive === item ?'selected':''}
          color={item}
          onClick={() => {
            handleSelectColor(item)
            activeColor(item);
          }}
        ></Button>
      )
);
}

export default ProductColor;