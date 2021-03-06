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
		__( 'book report', 'book-review-block' ),
		__( 'literature', 'book-review-block' ),
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
	example: {
		innerBlocks: [
			{
				name: 'core/image',
				attributes: {
					align: 'left',
					height: 300,
					url: 'http://books.google.com/books/content?id=sJdUAzLUNyAC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
				},
			},
			{
				name: 'book-review-block/metadata',
				attributes: {
					author: 'Suzanne Collins',
					format: 'Hardcover',
					genre: 'Young Adult',
					pages: '374',
					publisher: 'Scholastic Press',
					releaseDate: 'September 14, 2008',
					series: 'The Hunger Games #1',
					source: ' ',
					title: 'The Hunger Games',
				},
			},
			{
				name: 'book-review-block/rating',
				attributes: {
					rating: 4.5,
				},
			},
			{
				name: 'book-review-block/description',
				attributes: {
					summary: '<p>In a future North America, where the rulers of Panem maintain control through an annual televised survival competition pitting young people from each of the twelve districts against one another, sixteen-year-old Katniss\'s skills are put to the test when she voluntarily takes her younger sister\'s place.</p>',
				},
			},
		],
	},
	edit,
	save,
	deprecated: [ deprecatedV1, deprecatedV2 ],
} );
