const assert = require('assert');
const { scoreReview,
  rankUserReviews,
  scoreReviewWithRecency,
  rankUserReviewsWithRecency,
} = require('../index');
const { DateTime } = require('luxon');

const DEFAULT_REVIEW = {
  likeCount: 0,
  createdAt: new DateTime.local(),
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

describe("scoreReviewWithRecency", () => {

  it("should be higher when likeCount is higher", () => {
    const moreLikedReview = createReview({likeCount: 2});
    const lessLikedReview = createReview({likeCount: 1});
    assert(scoreReviewWithRecency(moreLikedReview) > scoreReviewWithRecency(lessLikedReview));
  });

    
  it("should be lower when review is older", () => {
    const newerReview = createReview({createdAt: '2018-09-26'});
    const olderReview = createReview({ createdAt: '2018-09-01' });
    assert(scoreReviewWithRecency(newerReview) > scoreReviewWithRecency(olderReview));
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

describe.only("rankUserReviewsWithRecency", () => {
  it("should rank recently created higher than older with more likes", () => {
    const twoWeeksAgo = new DateTime.local().minus({ weeks: 2 });
    const olderReviewWithMoreLikes = createReview({likeCount: 2, createdAt: twoWeeksAgo});
    const lessLikedButNewerReview = createReview({ likeCount: 1, createdAt: new DateTime.local() });
    const ranked = rankUserReviewsWithRecency([olderReviewWithMoreLikes, lessLikedButNewerReview]);
    assert.deepStrictEqual(ranked, [lessLikedButNewerReview, olderReviewWithMoreLikes]);
  });
});
