// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(2305): Module '"react-router-dom"' has no exported member... Remove this comment to see the full error message
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module '../nav/SidebarMenu' was resolved to 'C:/Us... Remove this comment to see the full error message
import SidebarMenu from '../nav/SidebarMenu';
// @ts-expect-error TS(6142): Module './ProductContainer' was resolved to 'C:/Us... Remove this comment to see the full error message
import ProductContainer from './ProductContainer';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/main.scss';

// @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
const CategoryBanner = (props: any) => <img src={require('../../assets/img'+ props.bannerPath +'Banner.jpg')}/>

class FilterSite extends Component {
  props: any;
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      dataProducts: [],
      nameProList: ''
    }
    this.handleProList = this.handleProList.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
  }

  componentDidMount() {
    const arrSitePath = this.props.location.pathname.match(/\/[a-z\-]*/g);

    if (arrSitePath[1]) {
      this.handleGetData(arrSitePath.join(''));
    }

    Scroll(290,300);
  }

  handleGetData(path: any){
    axios
    .get('/src/data/productData' + path + '.json')
    .then(res => this.setState({dataProducts: res.data}))
    .catch(err => console.log(err))
  }

  handleProList(path: any,nameProList: any){
    this.handleGetData(path);
    this.setState({nameProList:nameProList.toUpperCase()})
  }

  render() {

    const {
      handleProList
    } = this;

    const {
      dataProducts,
      nameProList
    } = this.state;

    const currentPath = this.props.match.url;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid id='main-wrap' textAlign='center'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column as='aside' width={3} textAlign='left'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            children={({
              match,
              location
            }: any) => {
              return(
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <SidebarMenu match={match} location={location} handleProList={handleProList}/>
              )
            }}
          />
        </Grid.Column>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid.Column as='section' width={10}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Switch>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route
              // @ts-expect-error TS(2322): Type '{ exact: true; path: string; children: ({ ma... Remove this comment to see the full error message
              exact
              path={currentPath + '/*' }
              children={({
                match,
                location
              }: any) => {
                return(
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <ProductContainer
                    location={location}
                    dataProducts={dataProducts}
                    showcaseHeader={nameProList}
                  />
                )
              }}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Route
              // @ts-expect-error TS(2322): Type '{ exact: true; path: any; children: () => an... Remove this comment to see the full error message
              exact
              path={currentPath}
              children={() => {
                return(
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <CategoryBanner bannerPath={currentPath}/>
                )
              }}/>
          </Switch>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FilterSite;