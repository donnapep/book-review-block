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
	rating: {
		type: 'number',
		default: 1,
	},
};

registerBlockType( 'book-review-block/rating', {
	title: __( 'Rating', 'book-review-block' ),
	description: __(
		'Add a star rating.',
		'book-review-block'
	),
	keywords: [
		'book',
	],
	icon: 'star-filled',
	category: 'widgets',
	attributes,
	edit,
	save,
	parent: [ 'book-review-block/book-review' ],
} );
