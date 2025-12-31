/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

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

dispatch( 'core' ).addEntities( [
	{
		baseURL: '/book-review-block/v1/settings',
		kind: 'book-review-block/v1',
		name: 'settings',
	},
] );

registerBlockType( metadata, {
	icon,
	edit,
	save,
	deprecated,
} );
