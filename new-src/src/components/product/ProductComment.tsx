// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Grid, Divider, Comment } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductCommentItem' was resolved to 'C:/... Remove this comment to see the full error message
import ProductCommentItem from './ProductCommentItem';
import '../../util/mockComment.js';
import axios from 'axios';
const ProductComment = (props: any) => {

  const itemsComment = props.dataComments.map(function(item: any,index: any){
    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ProductCommentItem
        key={item.id}
        {...item}
      />
    )
  })

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid.Column width={12}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Divider horizontal><span>Product Comment</span></Divider>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Comment.Group as='ul' id='comment-area' size='large'>
        {itemsComment}
      </Comment.Group>
    </Grid.Column>
  )
}
export default ProductComment;