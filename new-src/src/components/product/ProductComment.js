import React, { Component } from 'react';
import { Grid, Divider, Comment } from 'semantic-ui-react';
import ProductCommentItem from './ProductCommentItem';
import '../../util/mockComment.js';
import axios from 'axios';
const ProductComment = (props) => {

  const itemsComment = props.dataComments.map(function(item,index){
    return(
      <ProductCommentItem
        key={item.id}
        {...item}
      />
    )
  })

  return(
    <Grid.Column width={12}>
      <Divider horizontal><span>Product Comment</span></Divider>
      <Comment.Group as='ul' id='comment-area' size='large'>
        {itemsComment}
      </Comment.Group>
    </Grid.Column>
  )
}
export default ProductComment;