/**
 * External dependencies
 */
import { range } from 'lodash';

/**
 * WordPress dependencies
 */
import { ENTER } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { StarIcon } from './icon';

export const RatingButton = ( { id, setRating, children } ) => {
	const setNewRating = newRating => () => setRating( newRating );
	const maybeSetNewRating = newRating => ( { keyCode } ) =>
		keyCode === ENTER ? setRating( newRating ) : null;

	return (
		<span
			className="book-review-block__rating-button"
			tabIndex={ 0 }
			role="button"
			onKeyDown={ maybeSetNewRating( id ) }
			onClick={ setNewRating( id ) }
		>
			{ children }
		</span>
	);
};

export const Rating = ( { setAttributes, rating } ) => {
	const setNewRating = newRating => {
		if ( newRating === rating ) {
			// Same number clicked twice.
			// Check if a half rating.
			if ( Math.ceil( rating ) === rating ) {
				// Whole number.
				newRating = newRating - 0.5;
			}
		}

		setAttributes( { book_review_rating: newRating.toString() } );
	};

	return (
		<div className="book-review-block__rating book-review-block__review-rating">
			{ range( 1, 6 ).map( position => (
				<RatingButton key={ position } id={ position } setRating={ setNewRating }>
					<span>
						<StarIcon className={ rating >= position - 0.5 ? null : 'is-rating-unfilled' }
						/>
					</span>
					<span>
						<StarIcon className={ rating >= position ? null : 'is-rating-unfilled' }
						/>
					</span>
				</RatingButton>
			) ) }
		</div>
	);
};
