/**
 * WordPress dependencies
 */
import { store as blockEditorStore, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import createDescriptionBlocks from './create-description-blocks';

const allowedBlocks = [ 'core/paragraph' ];
const template = [
	[ 'core/paragraph', { placeholder: __( 'Description', 'book-review-block' ) } ],
];

function DescriptionEdit( { attributes, clientId, setAttributes } ) {
	const { needsLegacySummary } = attributes;
	const blockProps = useBlockProps( {
		className: 'book-review-block__description',
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template: needsLegacySummary ? undefined : template,
	} );
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		if ( ! needsLegacySummary || ! meta ) {
			return;
		}

		// Post meta is unavailable when Gutenberg runs the parent block's migration.
		const descriptionBlocks = createDescriptionBlocks( meta.book_review_summary );
		if ( descriptionBlocks.length ) {
			replaceInnerBlocks( clientId, descriptionBlocks );
		}
		setAttributes( { needsLegacySummary: undefined } );
	}, [ clientId, meta, needsLegacySummary, replaceInnerBlocks, setAttributes ] );

	return <div { ...innerBlocksProps } />;
}

export default DescriptionEdit;
