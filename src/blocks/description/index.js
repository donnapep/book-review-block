/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, ...settings } = metadata;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
