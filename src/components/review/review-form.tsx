import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviews } from '../../store/api-action';
import { Offer } from '../../types/offer';
import { dropReviewSendingStatus } from '../../store/actions';
import { getSendingStatus } from '../../store/reviews/selector';

type ReviewsTypeProps = {
  offerId: Offer['id'];
}

function ReviewForm({offerId}: ReviewsTypeProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | string>('');
  const isValid = comment.length >= MIN_COMMENT_LENGTH && rating !== '' && comment.length <= MAX_COMMENT_LENGTH;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleCommentChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    setLoading(true);

    dispatch(
      postReviews({
        reviewData: {
          comment,
          rating: +rating,
        },
        offerId,
      })
    )
      .then(() => {
        setComment('');
        setRating('');
      })
      .catch(() => {
        setError('Failed to submit review. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const sendingStatus = useAppSelector(getSendingStatus);

  useEffect(() => {
    if (sendingStatus === RequestStatus.Success) {
      dispatch(dropReviewSendingStatus());
      setComment('');
      setRating('');
      setError(null);
    } else if (sendingStatus === RequestStatus.Error) {
      dispatch(dropReviewSendingStatus());
      setError('Failed to submit review. Please try again.');
    }
  }, [sendingStatus, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleFormSubmit}
    >
      {sendingStatus === RequestStatus.Error && (
        <p>Failed to submit the form. Please try again later </p>
      )}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {['5', '4', '3', '2', '1'].map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleRatingChange}
              checked={rating === value}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        value={comment}
        onChange={handleCommentChange}
        id="review"
        name="review"
        placeholder='Tell how was your stay, what you like and what can be improved'
      />
      {comment.length > MAX_COMMENT_LENGTH ?
        <p className="reviews__error" style={{color: 'red'}}>Comment should not exceed 300 characters.</p>
        : ''}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit a review, please make sure to set a rating and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="reviews__error" style={{ color: 'red' }}>{error}</p>}
      </div>
    </form>
  );
}

export default ReviewForm;
