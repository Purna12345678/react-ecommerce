// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback } from 'react';
import { Header, Button } from 'semantic-ui-react';

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function ProductColor(this: any) {const activeColor = useCallback((color: any) => this.setState({
      clsActive: color
    }), [/* TODO: Add dependencies */]);
return (
(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button
          as='li'
          disabled={false}
          // @ts-expect-error TS(2304): Cannot find name 'index'.
          key={index}
          // @ts-expect-error TS(2304): Cannot find name 'clsActive'.
          className={clsActive === item ?'selected':''}
          // @ts-expect-error TS(2304): Cannot find name 'item'.
          color={item}
          onClick={() => {
            // @ts-expect-error TS(2304): Cannot find name 'handleSelectColor'.
            handleSelectColor(item)
            // @ts-expect-error TS(2304): Cannot find name 'item'.
            activeColor(item);
          }}
        ></Button>
      )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default ProductColor;