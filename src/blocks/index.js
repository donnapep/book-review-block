/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import deprecatedV1 from './deprecated/v1';
import deprecatedV2 from './deprecated/v2';
import edit from './edit';
import icon from './icon';
import save from './save';
import './description';
import './metadata';
import './rating';

dispatch( 'core' ).addEntities( [
	{
		baseURL: '/book-review-block/v1/settings',
		kind: 'book-review-block/v1',
		name: 'settings',
	},
] );

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'book-review-block/book-review', {
	title: __( 'Book Review', 'book-review-block' ),
	description: __(
		'Add details such as title, author, cover image, star rating and more to your book reviews.',
		'book-review-block'
	),
	icon: icon,
	category: 'widgets',
	keywords: [
		__( 'read', 'book-review-block' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes: {
		backgroundColor: {
			type: 'string',
		},
		isbn: {
			type: 'string',
		}
	},
	edit,
	save,
	deprecated: [ deprecatedV1, deprecatedV2 ],
} );
