// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Comment, Icon, Rating } from 'semantic-ui-react';
const ProductCommentItem = (props: any) => {
  const {
    urlAvatar,
    username,
    date,
    rating,
    content
  } = props;

  const stars = new Array();

  for (var i = 0; i < rating; i++) {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    stars.push(<Icon key={i} name='star' />);
  }

  return(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Comment as='li'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Comment.Avatar as='span' src={urlAvatar} />
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Comment.Content>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Comment.Author as='span'>{username}</Comment.Author>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Comment.Metadata>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span>{date}</span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Rating as='span' icon='star' disabled defaultRating={rating} maxRating={5} />
      </Comment.Metadata>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Comment.Text as='p'>
        {content}
      </Comment.Text>
    </Comment.Content>
  </Comment>
  )
}
export default ProductCommentItem;