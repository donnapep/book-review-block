/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import deprecated from './deprecated';
import edit from './edit';
import save from './save';

const { name, ...settings } = metadata;

registerBlockType( name, {
	...settings,
	edit,
	save,
	deprecated,
} );
