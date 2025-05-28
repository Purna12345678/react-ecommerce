// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React,{ Component } from 'react';
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

class BannerCarousel extends Component {
  axios: any;
  openSlide: any;
  setState: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      delay: 0,
      dataCarousel: []
    };
    this.openSlide = false;
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    axios
    // @ts-expect-error TS(2345): Argument of type '{ dataType: string; }' is not as... Remove this comment to see the full error message
    .get('/src/data/carousel.json',{dataType: 'json'})
    .then(res => this.setState({
      dataCarousel: res.data
    }))
    .catch(err => console.log(err));
    Scroll(330,300);
  }

  componentWillUnmount() {
    this.axios = null;
  }

  onChange(e: any, int: any) {
    // Change duration after switching to the next 在切换到下一个后把延时改掉。
    if (int === 1 && e === 'after' && !this.openSlide) {
      this.setState({
        delay: 600,
      });
      this.openSlide = true;
    }
  }
  render(){
    const {
      delay,
      dataCarousel
    } = this.state;

    // Carousel Settings 轮播图配置
    const settings = {
      prefixCls: "carousel-wrap",
      type: "acrossOverlay",
      onChange: this.onChange,
      duration: 1000,
      ease: "easeInOutExpo",
      arrow: false,
      autoPlay: true,
      autoPlaySpeed: 6000
    }

    let itemsBannerCarousel = dataCarousel.map(function(item: any,index: any){
      return(
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
    })
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <BannerAnim
        {...settings}
        ref="banner"
        sync
      >
        {itemsBannerCarousel}
      </BannerAnim>
    )
  }
}

export default BannerCarousel;