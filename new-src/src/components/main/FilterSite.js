import React, { Component, useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import SidebarMenu from '../nav/SidebarMenu';
import ProductContainer from './ProductContainer';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/main.scss';

const CategoryBanner = (props) => (
  <img src={require('../../assets/img'+ props.bannerPath +'Banner.jpg')}/>
)

export default function FilterSite(props) {const handleGetData = useCallback((path) => axios
    .get('/src/data/productData' + path + '.json')
    .then(res => this.setState({dataProducts: res.data}))
    .catch(err => console.log(err)), [/* TODO: Add dependencies */]);
const handleProList = useCallback((path, nameProList) => handleGetData(path);
this.setState({nameProList:nameProList.toUpperCase()}), [/* TODO: Add dependencies */]
;
return (
(
      <Grid id='main-wrap' textAlign='center'>
        <Grid.Column as='aside' width={3} textAlign='left'>
          <Route
            children={({ match, location }) => {
              return(
                <SidebarMenu match={match} location={location} handleProList={handleProList}/>
              )
            }}
          />
        </Grid.Column>
        <Grid.Column as='section' width={10}>
          <Switch>
            <Route
              exact
              path={currentPath + '/*' }
              children={({ match, location }) => {
                return(
                  <ProductContainer
                    location={location}
                    dataProducts={dataProducts}
                    showcaseHeader={nameProList}
                  />
                )
              }}
            />
            <Route
              exact
              path={currentPath}
              children={() => {
                return(
                  <CategoryBanner bannerPath={currentPath}/>
                )
              }}/>
          </Switch>
        </Grid.Column>
      </Grid>
    )
);
}

export default FilterSite;