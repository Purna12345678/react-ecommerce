// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useState, useCallback } from 'react';
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

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function RouteApp() {
  const [cart, setCart] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
// @ts-expect-error TS(7006): Parameter 'product' implicitly has an 'any' type.
const handleAddToCart = useCallback((product) => setCart([...cart,product]), [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'email' implicitly has an 'any' type.
const handleLogin = useCallback((email, password) => let dataUser = new Array;
axios
    .get('http://localhost:8080/src/data/userdata.json')
    .then(res=> {
      // @ts-expect-error TS(7006): Parameter 'item' implicitly has an 'any' type.
      res.data.forEach(function(item,index){
        // @ts-expect-error TS(2304): Cannot find name 'email'.
        if(item.email != email)return;
        // @ts-expect-error TS(2304): Cannot find name 'password'.
        if(item.password != password)return;
        setIsLogin(true);
      })
    })
    .catch(err=>console.log(err)), [/* TODO: Add dependencies */]
;
return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Router history={browserHistory}>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div id='body'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route children={({location})=>{
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
    )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default RouteApp;