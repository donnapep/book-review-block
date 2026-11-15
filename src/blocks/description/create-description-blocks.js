/**
 * WordPress dependencies
 */
import { autop } from '@wordpress/autop';
import { rawHandler } from '@wordpress/blocks';

export default function createDescriptionBlocks( summary ) {
	if ( typeof summary !== 'string' || ! summary.trim() ) {
		return [];
	}

	// Keep explicit paragraph boundaries. Older post meta and Google Books can
	// provide text separated by newlines or breaks instead of paragraph tags.
	const HTML = /<p(?:\s|>)/i.test( summary ) ? summary : autop( summary );

	return rawHandler( { HTML } );
}
