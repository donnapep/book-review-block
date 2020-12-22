/**
 * External dependencies
 */
import { range } from 'lodash';

const RatingSave = ( { attributes } ) => {
	const { rating } = attributes;

	return (
		<div
			itemscope
			itemtype="https://schema.org/Review"
			itemprop="review"
		>
			<div
				itemscope
				itemtype="https://schema.org/Rating"
				itemprop="reviewRating"
				className="book-review-block__rating book-review-block__review-rating"
			>
				<meta
					itemprop="ratingValue"
					content={ rating }
				/>

				<div className="book-review-block__rating-buttons">
					{ range( 1, 6 ).map( position => (
						<span
							className="book-review-block__rating-button"
							key={ position }
							role="button"
							tabIndex={ 0 }
						>
							<span>
								<svg
									xmlns="https://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										className={ rating >= position - 0.5 ? null : 'is-rating-unfilled' }
										fill="#eba845"
										stroke="#eba845"
										d="M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z"
									/>
								</svg>
							</span>

							<span>
								<svg
									xmlns="https://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										className={ rating >= position ? null : 'is-rating-unfilled' }
										fill="#eba845"
										stroke="#eba845"
										d="M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z"
									/>
								</svg>
							</span>
						</span>
					) ) }
				</div>
			</div>
		</div>
	);
}

export default RatingSave;
