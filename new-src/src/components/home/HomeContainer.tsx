// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(6142): Module '../carousel/BannerCarousel' was resolved t... Remove this comment to see the full error message
import BannerCarousel from '../carousel/BannerCarousel';
// @ts-expect-error TS(6142): Module './HomeProductSection' was resolved to 'C:/... Remove this comment to see the full error message
import HomeProductSection from './HomeProductSection';

const Home = () => (
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  (<section>// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BannerCarousel/>// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HomeProductSection/>// @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </section>)
)

export default Home;