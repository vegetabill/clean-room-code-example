const { DateTime } = require('luxon');

const ageInWeeks = (review) => {
  if (!review.createdAt) {
    return 0;
  }
  const createdAt = DateTime.fromISO(review.createdAt);
  const diff = DateTime.local().diff(createdAt, 'weeks');
  return Math.floor(diff.weeks);
};

const scoreReview = (review) => review.likeCount + review.reviewer.followerCount;

const scoreReviewWithRecency = (review) => scoreReview(review) - ageInWeeks(review);

const rankUserReviews = (reviews) => {
  const copy = [].concat(reviews);
  return copy.sort((a, b) => scoreReview(b) - scoreReview(a));
};

const rankUserReviewsWithRecency = (reviews) => {
  const copy = [].concat(reviews);
  return copy.sort((a, b) => scoreReviewWithRecency(b) - scoreReviewWithRecency(a));
};

module.exports = {
  scoreReview,
  scoreReviewWithRecency,
  rankUserReviews,
  rankUserReviewsWithRecency,
};