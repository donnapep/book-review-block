/**
 * External dependencies
 */
import { createBlock } from '@wordpress/blocks';
import classnames from 'classnames';
import { pick } from 'lodash';

export default {
	attributes: {
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},
		author: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__author',
		},
		backgroundColor: {
			type: 'string',
		},
		format: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__format',
		},
		genre: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__genre',
		},
		pages: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__pages',
		},
		publisher: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__publisher',
		},
		rating: {
			type: 'string',
		},
		releaseDate: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__release-date',
		},
		series: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__series',
		},
		source: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__source',
		},
		summary: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__description',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__title',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},

	migrate( attributes ) {
		return [
			pick( attributes, [ 'backgroundColor' ] ),
			[
				createBlock( 'core/image', {
					align: 'left',
					alt: attributes.alt,
					url: attributes.url,
				} ),
				createBlock( 'book-review-block/metadata', {
					author: attributes.author,
					format: attributes.format,
					genre: attributes.genre,
					pages: attributes.pages,
					publisher: attributes.publisher,
					releaseDate: attributes.releaseDate,
					series: attributes.series,
					source: attributes.source,
					title: attributes.title,
				} ),
				createBlock( 'book-review-block/rating', {
					rating: Number( attributes.rating, 10 ),
				} ),
				createBlock( 'book-review-block/description', {
					summary: attributes.summary,
				} ),
			],
		];
	},

	save( { attributes } ) {
		const {
			alt,
			author = [],
			backgroundColor,
			format = [],
			genre = [],
			pages = [],
			publisher = [],
			rating: reviewRating,
			releaseDate = [],
			series = [],
			source = [],
			summary = [],
			title = [],
			url,
		} = attributes;
		const className = classnames( 'book-review-block', {
			'has-background': backgroundColor,
		} );
		const styles = {
			backgroundColor: backgroundColor,
		};
		const ratings = [
			{ rating: 5 },
			{ rating: 4 },
			{ rating: 3 },
			{ rating: 2 },
			{ rating: 1 },
		];

		return (
			<div
				className={ className }
				style={ styles }>
				{ !! url && (
					<div className="book-review-block__cover-wrapper">
						<img className="book-review-block__cover" src={ url } alt={ alt } />
					</div>
				) }
				<div className="book-review-block__details">
					{ title.length > 0 && <span className="book-review-block__title">{ title }</span> }
					{ series.length > 0 && <span className="book-review-block__series">{ series }</span> }
					{ author.length > 0 && <span className="book-review-block__author">{ author }</span> }
					{ genre.length > 0 && <span className="book-review-block__genre">{ genre }</span> }
					{ publisher.length > 0 && <span className="book-review-block__publisher">{ publisher }</span> }
					{ releaseDate.length > 0 && <span className="book-review-block__release-date">{ releaseDate }</span> }
					{ format.length > 0 && <span className="book-review-block__format">{ format }</span> }
					{ pages.length > 0 && <span className="book-review-block__pages">{ pages }</span> }
					{ source.length > 0 && <span className="book-review-block__source">{ source }</span> }

					<div className="book-review-block__rating">
						{ ratings.map( ( { rating } ) => (
							<span
								className={ reviewRating && rating <= reviewRating ? 'on' : 'off' }
								data-rating={ rating }
								key={ rating }>
								&#9734;
							</span>
						) ) }
					</div>

					{ summary.length > 0 && <div className="book-review-block__description">{ summary }</div> }
				</div>
			</div>
		);
	},
};
