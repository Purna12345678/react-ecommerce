import React from 'react';
import { Header } from 'semantic-ui-react';

export function ProductCount() {  return (
(
      <div class="product-count">
        <Header as='h4'>Count:{" "}<span>Select Count</span></Header>
      </div>
    )
);
}

export default ProductCount;