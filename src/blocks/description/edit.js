/**
 * External dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const DescriptionEdit = ( { attributes, setAttributes } ) => {
	const { summary } = attributes;
	// Workaround for https://github.com/WordPress/gutenberg/issues/27181.
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	useEffect( () => {
		// Use title as indicator that this block stored data in post meta.
		if ( meta['book_review_title'] ) {;
			setAttributes( { summary: meta['book_review_summary'] } );
		}
	}, [ meta ] );

	return (
		<div className="book-review-block__description">
			<RichText
				multiline="p"
				onChange={ newSummary => setAttributes( { summary: newSummary } ) }
				placeholder={ __( 'Description' ) }
				value={ summary }
				inlineToolbar />
		</div>
	);
}

export default DescriptionEdit;
