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
	summary: {
		type: 'string',
		source: 'html',
		selector: '.book-review-block__description',
		multiline: 'p',
	},
};

registerBlockType( 'book-review-block/description', {
	title: __( 'Description', 'book-review-block' ),
	description: __(
		'Add a brief description of the book.',
		'book-review-block'
	),
	keywords: [
		'book',
		'summary',
		'synopsis',
	],
	icon: 'media-text',
	category: 'book-review',
	attributes,
	edit,
	save,
	parent: [ 'book-review-block/book-review' ],
} );
