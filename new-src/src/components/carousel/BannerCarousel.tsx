// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React,{ Component, useCallback, useEffect } from 'react';
// @ts-expect-error TS(2307): Cannot find module 'rc-banner-anim' or its corresp... Remove this comment to see the full error message
import BannerAnim from 'rc-banner-anim';
// @ts-expect-error TS(2307): Cannot find module 'rc-queue-anim' or its correspo... Remove this comment to see the full error message
import QueueAnim from 'rc-queue-anim';
// @ts-expect-error TS(2307): Cannot find module 'rc-tween-one' or its correspon... Remove this comment to see the full error message
import TweenOne from 'rc-tween-one';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/carousel.scss';

const { Element, Arrow } = BannerAnim;
const BgElement = Element.BgElement;

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function BannerCarousel() {const onChange = useCallback((e, int) => if (int === 1 && e === 'after' && !this.openSlide) {
      // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.setState({
        delay: 600,
      });
      // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.openSlide = true;
    }, [/* TODO: Add dependencies */]);
return (
(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Element key={index}
          prefixCls="carousel-elem"
          hideProps={{ 2: { reverse: true } }}
          followParallax={{
            delay: 1000,
            data: [
              { id: 'carousel-title', value: -30, type: 'x' },
              { id: 'carousel-text', value: 50, type: 'x' },
            ],
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <BgElement
            key='bg'
            className="carousel-bg"
            style={{
              // @ts-expect-error TS(2304): Cannot find name 'item'.
              backgroundImage: 'url('+ item.url +')',
            }}
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <TweenOne
            id='carousel-title'
            key='title'
            className="carousel-header"
            animation={{ y: 30, opacity: 0, type: 'from', delay: 600 }}>
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <h2>{item.title}</h2>
          </TweenOne>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <TweenOne
            id='carousel-text'
            key='text'
            animation={{ y: 30, opacity: 0, type: 'from', delay: 1200 }}
          >
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <p>{item.des}</p>
          </TweenOne>
        </Element>
      )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default BannerCarousel;