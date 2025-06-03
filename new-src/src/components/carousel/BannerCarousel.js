import React,{ Component, useCallback, useEffect } from 'react';
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/carousel.scss';

const { Element, Arrow } = BannerAnim;
const BgElement = Element.BgElement;

export default function BannerCarousel() {const onChange = useCallback((e, int) => if (int === 1 && e === 'after' && !this.openSlide) {
      this.setState({
        delay: 600,
      });
      this.openSlide = true;
    }, [/* TODO: Add dependencies */]);
return (
(
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
          <BgElement
            key='bg'
            className="carousel-bg"
            style={{
              backgroundImage: 'url('+ item.url +')',
            }}
          />
          <TweenOne
            id='carousel-title'
            key='title'
            className="carousel-header"
            animation={{ y: 30, opacity: 0, type: 'from', delay: 600 }}>
            <h2>{item.title}</h2>
          </TweenOne>
          <TweenOne
            id='carousel-text'
            key='text'
            animation={{ y: 30, opacity: 0, type: 'from', delay: 1200 }}
          >
            <p>{item.des}</p>
          </TweenOne>
        </Element>
      )
);
}

export default BannerCarousel;