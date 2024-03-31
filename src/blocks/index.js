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
import deprecated from './deprecated';
import icon from './icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './description';
import './metadata';
import './rating';

const { name, ...settings } = metadata;

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
registerBlockType( name, {
	...settings,
	icon: icon,
	supports: {
		align: [ 'wide', 'full' ],
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
	deprecated,
} );
