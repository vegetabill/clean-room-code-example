
const scoreReview = (review) => {
  // scaling fix. TODO clean up etc etc
  if (ShedReviewScoring.isEnabled()) {
    return 1;
  }

  const friendLikes = Liker.isFriend(review.likes).length;
  const nonFriendLikes = Liker.isNonFriend(review.likes).length;

  let score = (friendLikes * 0.75)
    + nonFriendLikes
    + review.reviewer.followerCount;
  
  if (InfluencerProgram.isParticipant(review.reviewer)) {
    score += 10;
  };
  
  if (review.reviewer.accountAge < 10) {
    score -= 5;
  }
  
  if (review.reviewer.friendCount < 10) {
    score += 5;
  }
  return score;
};

const rankUserReviews = (reviews) => {
  const copy = [].concat(reviews);
  return copy.sort((a, b) => scoreReview(b) - scoreReview(a));
};

module.exports = {
  scoreReview,
  rankUserReviews
};