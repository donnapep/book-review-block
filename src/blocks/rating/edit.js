/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import { range } from 'lodash';

/**
 * Internal dependencies
 */
import { StarIcon } from './icon';

const RatingButton = ( { id, setRating, children } ) => {
	const setNewRating = newRating => () => setRating( newRating );

	const maybeSetNewRating = newRating => ( { keyCode } ) =>
		keyCode === ENTER ? setRating( newRating ) : null;

	return (
		<span
			className="book-review-block__rating-button"
			role="button"
			tabIndex={ 0 }
			onKeyDown={ maybeSetNewRating( id ) }
			onClick={ setNewRating( id ) }
		>
			{ children }
		</span>
	);
};

const RatingEdit = ( {
	attributes,
	setAttributes,
} ) => {
	const { rating } = attributes;
	// Workaround for https://github.com/WordPress/gutenberg/issues/27181.
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	useEffect( () => {
		// Use title as indicator that this block stored to post meta.
		if ( meta['book_review_title'] ) {
			setAttributes( { rating: meta['book_review_rating'] ? Number( meta['book_review_rating'], 10 ) : 1 } );
		}
	}, [ meta ] );

	const setNewRating = newRating => {
		if ( newRating === rating ) {
			// Same number clicked twice. Check if it's a half rating.
			if ( Math.ceil( rating ) === rating ) {
				// Whole number.
				newRating = newRating - 0.5;
			}
		}

		setAttributes( { rating: newRating } );
	};

	return (
		<>
			<div className="book-review-block__rating book-review-block__review-rating">
				<div className="book-review-block__rating-buttons">
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
			</div>
		</>
	);
}

export default RatingEdit;
