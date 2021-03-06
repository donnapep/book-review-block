/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

const attributes = {
	author: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-author .book-review-block__meta-item-value',
		default: '',
	},
	format: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-format .book-review-block__meta-item-value',
		default: '',
	},
	genre: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-genre .book-review-block__meta-item-value',
		default: '',
	},
	pages: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-pages .book-review-block__meta-item-value',
		default: '',
	},
	publisher: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-publisher .book-review-block__meta-item-value',
		default: '',
	},
	releaseDate: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-release-date .book-review-block__meta-item-value',
		default: '',
	},
	series: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-series .book-review-block__meta-item-value',
		default: '',
	},
	source: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-source .book-review-block__meta-item-value',
		default: '',
	},
	title: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__meta-item-title .book-review-block__meta-item-value',
		default: '',
	},
	showLabels: {
		type: 'boolean',
		default: false,
	},
};

registerBlockType( 'book-review-block/metadata', {
	title: __( 'Metadata', 'book-review-block' ),
	description: __(
		'Add book details such as title and author.',
		'book-review-block'
	),
	keywords: [
		'book',
	],
	icon: 'info',
	category: 'widgets',
	attributes,
	edit,
	save,
	parent: [ 'book-review-block/book-review' ], // Only allow this block when it is nested in a Book Review block
} );
