
const scoreReview = (review) => review.likeCount + review.reviewer.followerCount;

const rankUserReviews = (reviews) => {
  const copy = [].concat(reviews);
  return copy.sort((a, b) => scoreReview(b) - scoreReview(a));
};

module.exports = {
  scoreReview,
  rankUserReviews
};