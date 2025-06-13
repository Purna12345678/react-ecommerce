import "react";

// @ts-expect-error TS(2364): The left-hand side of an assignment expression mus... Remove this comment to see the full error message
const FooterCopyright = () => (
  // @ts-expect-error TS(2304): Cannot find name 'div'.
  <div class="copyright">
    // @ts-expect-error TS(2304): Cannot find name 'p'.
    <p>
      // @ts-expect-error TS(2304): Cannot find name 'COPYRIGHT'.
      COPYRIGHT © TSEJX 2017.
      // @ts-expect-error TS(2304): Cannot find name 'br'.
      <br/>
      // @ts-expect-error TS(2304): Cannot find name 'ALL'.
      ALL RIGHTS RESERVED.
    </p>
  </div>
)

export default FooterCopyright;