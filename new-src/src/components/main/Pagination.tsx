// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  page: PT.number,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  currentPage: PT.number
}

class Pagination extends Component {
  props: any;

  constructor(props: any) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(){
    Scroll(290,300);
  }

  render(){
    const {
      page,
      currentPage
    } = this.props;

    let itemsPagination = new Array();

    for (var i = 0; i < page; i++) {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const link = (<Link to={'#'+(i+1)}>{i+1}</Link>)
      itemsPagination.push(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Menu.Item
          as='li'
          key={i}
          className={'page-item' + ' ' + `${i+1 === currentPage?'selected':''}`}
          children={link}
          onClick={this.handleItemClick}
        />
      )
    }

    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu as='ul' className='page-bar' pagination>
        {itemsPagination}
      </Menu>
    )
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Pagination.propTypes = propTypes;

export default Pagination;