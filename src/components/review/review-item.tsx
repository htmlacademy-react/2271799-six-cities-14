import formatDate from '../../utils';
import { ReviewType } from '../../types/review';

type ReviewPropsType = {
  review: ReviewType;
}

function ReviewItem ({review}: ReviewPropsType) {
  const ratingPercentage: number = (Math.round(review.rating) * 100) / 5;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt={review.user.name}
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercentage}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{formatDate(review.date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
