/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const DescriptionEdit = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps( {
		className: 'book-review-block__description',
	} );
	const { summary } = attributes;
	// Workaround for https://github.com/WordPress/gutenberg/issues/27181.
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	useEffect( () => {
		// Use title as indicator that this block stored data in post meta.
		if ( meta['book_review_title'] ) {
			setAttributes( { summary: meta['book_review_summary'] } );
		}
	}, [ meta ] );

	return (
		<RichText
			{ ...blockProps }
			onChange={ ( newSummary ) => setAttributes( { summary: newSummary } ) }
			placeholder={ __( 'Description' ) }
			value={ summary }
		/>
	);
};

export default DescriptionEdit;
