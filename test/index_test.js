const assert = require('assert');
const { scoreReview } = require('../index');

const DEFAULT_REVIEW = {
  likeCount: 0,
  reviewer: {
    followerCount: 0
  }
};

const createReview = (overrides = {}) => {
  return Object.assign(
    {},
    DEFAULT_REVIEW,
    overrides);
};

describe("scoreReview", () => {

  it("should be higher when likeCount is higher", () => {
    const moreLikedReview = createReview({likeCount: 2});
    const lessLikedReview = createReview({likeCount: 1});
    assert(scoreReview(moreLikedReview) > scoreReview(lessLikedReview));
  });

});
