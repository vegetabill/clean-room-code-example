const assert = require('assert');
const { scoreReview, rankUserReviews } = require('../index');

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
  
  it("should be lower when review is older", () => {
    const newerReview = createReview({createdAt: '2018-09-26'});
    const olderReview = createReview({ createdAt: '2018-09-01' });
    assert(scoreReview(newerReview, { useRecency: true }) > scoreReview(olderReview, { useRecency: true }));
  })

});

describe("rankUserReviews", () => {
  it("should rank more likes higher", () => {
    const moreLikedReview = createReview({likeCount: 2});
    const lessLikedReview = createReview({ likeCount: 1 });
    const ranked = rankUserReviews([lessLikedReview, moreLikedReview]);
    assert.deepStrictEqual(ranked, [moreLikedReview, lessLikedReview]);
  });
});
