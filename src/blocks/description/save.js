/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function DescriptionSave() {
	const blockProps = useBlockProps.save( {
		className: 'book-review-block__description',
	} );

	return <div { ...useInnerBlocksProps.save( blockProps ) } />;
}

export default DescriptionSave;
