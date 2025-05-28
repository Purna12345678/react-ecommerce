// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(2305): Module '"react-router-dom"' has no exported member... Remove this comment to see the full error message
import { BrowserRouter as Router, Route, Switch, Redirect,browserHistory } from 'react-router-dom';
import axios from 'axios';

// Publick 公用组件
// @ts-expect-error TS(6142): Module '../components/header/Header' was resolved ... Remove this comment to see the full error message
import Header from '../components/header/Header';
// @ts-expect-error TS(6142): Module '../components/footer/Footer' was resolved ... Remove this comment to see the full error message
import Footer from '../components/footer/Footer';

// Home 首页组件
// @ts-expect-error TS(6142): Module '../components/home/HomeContainer' was reso... Remove this comment to see the full error message
import Home from '../components/home/HomeContainer';

// Classification 分类页组件
// @ts-expect-error TS(6142): Module '../components/main/FilterSite' was resolve... Remove this comment to see the full error message
import FilterSite from '../components/main/FilterSite';

// Search 搜索页组件
// @ts-expect-error TS(6142): Module '../components/main/SearchSite' was resolve... Remove this comment to see the full error message
import SearchSite from '../components/main/SearchSite';

// Detail 商品详情页组件
// @ts-expect-error TS(6142): Module '../components/product/ProductDetailSite' w... Remove this comment to see the full error message
import ProductDetailSite from '../components/product/ProductDetailSite';

// Cart 购物车组件
// @ts-expect-error TS(6142): Module '../components/cart/CartSite' was resolved ... Remove this comment to see the full error message
import CartSite from '../components/cart/CartSite';

// Register & Login 登录注册组件
// @ts-expect-error TS(6142): Module '../components/user/LoginSite' was resolved... Remove this comment to see the full error message
import LoginSite from '../components/user/LoginSite';
// @ts-expect-error TS(6142): Module '../components/user/RegisterSite' was resol... Remove this comment to see the full error message
import RegisterSite from '../components/user/RegisterSite';

class RouteApp extends React.Component {
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      cart: []
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleAddToCart(product: any){
    this.setState({cart: [...this.state.cart,product]})
  }

  handleLogin(email: any,password: any){
    let dataUser = new Array;

    const _this = this;

    axios
    .get('http://localhost:8080/src/data/userdata.json')
    .then(res=> {
      res.data.forEach(function(item: any,index: any){
        if(item.email != email)return;
        if(item.password != password)return;
        _this.setState({isLogin:true});
      })
    })
    .catch(err=>console.log(err))
  }

  render(){

    const {
      handleAddToCart,
      handleLogin
    } = this;

    const {
      cart,
      isLogin
    } = this.state;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Router history={browserHistory}>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div id='body'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route children={({
            location
          }: any)=>{
            return(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Header location={location} cart={cart}/>
            )
          }}/>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Switch>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Redirect from='/home' to='/' />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route exact path='/' component={Home} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/search' component={SearchSite} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/cart' children={()=>{
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              return(<CartSite isLogin={isLogin} cart={cart} handleLogin={handleLogin}/>)
            }} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/login' children={()=>{
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              return(<LoginSite isLogin={isLogin} handleLogin={handleLogin}/>)
            }} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/register' component={RegisterSite} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/:category/:type/**' children={()=>{
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              return(<ProductDetailSite handleAddToCart={handleAddToCart}/>)
            }} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route path='/:category' component={FilterSite} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Redirect from='*' to='/'  />
          </Switch>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route component={Footer}/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      </Router>
    );
  }
}

export default RouteApp;