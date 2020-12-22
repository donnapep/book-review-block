import { createBlock } from '@wordpress/blocks';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { pick } from 'lodash';

export default {
	attributes: {
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},
		backgroundColor: {
			type: 'string',
		},
		id: {
			type: 'number',
		},
		book_review_author: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_author',
		},
		book_review_cover_url: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_cover_url',
		},
		book_review_format: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_format',
		},
		book_review_genre: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_genre',
		},
		book_review_isbn: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_isbn',
		},
		book_review_pages: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_pages',
		},
		book_review_publisher: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_publisher',
		},
		book_review_rating: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_rating',
		},
		book_review_release_date: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_release_date',
		},
		book_review_series: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_series',
		},
		book_review_source: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_source',
		},
		book_review_summary: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_summary',
		},
		book_review_title: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_title',
		},
	},

	migrate( attributes, innerBlocks ) {
		// Because of https://github.com/WordPress/gutenberg/issues/27181, all meta attributes are undefined.
		return [
			{
				...pick( attributes, [ 'backgroundColor', 'id' ] ),
				isbn: attributes.book_review_isbn,
			},
			[
				createBlock( 'core/image', {
					alt: attributes.alt,
					url: attributes.book_review_cover_url,
				} ),
				createBlock( 'book-review-block/metadata', {
					author: attributes.book_review_author,
					format: attributes.book_review_format,
					genre: attributes.book_review_genre,
					pages: attributes.book_review_pages,
					publisher: attributes.book_review_publisher,
					releaseDate: attributes.book_review_release_date,
					series: attributes.book_review_series,
					source: attributes.book_review_source,
					title: attributes.book_review_title,
				} ),
				createBlock( 'book-review-block/rating', {
					rating: attributes.book_review_rating,
				} ),
				createBlock( 'book-review-block/description', {
					summary: attributes.book_review_summary,
				} ),
				...innerBlocks,
			],
		];
	},

	save: ( attributes ) => {
		return null;
	},
};
