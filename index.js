const { DateTime } = require('luxon');

const ageInWeeks = (review) => {
  const createdAt = DateTime.fromISO(review.createdAt);
  return DateTime.local().diff(createdAt, 'weeks');
} 

const scoreReview = (review, opts = {}) => {
  const { useRecency = false } = opts;
  if (useRecency) {
    return review.likeCount + review.reviewer.followerCount - ageInWeeks(review);
  } else {
    return review.likeCount + review.reviewer.followerCount
  }
};

const rankUserReviews = (reviews, opts = {}) => {
  const { useRecency = false } = opts;
  const copy = [].concat(reviews);
  return copy.sort((a, b) => scoreReview(b, { useRecency }) - scoreReview(a, { useRecency }));
};

module.exports = {
  scoreReview,
  rankUserReviews
};