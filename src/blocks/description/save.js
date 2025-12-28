/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const DescriptionSave = ( { attributes } ) => {
	const blockProps = useBlockProps.save( {
		className: 'book-review-block__description',
	} );
	const { summary } = attributes;

	return (
		<RichText.Content
			{ ...blockProps }
			tagName="div"
			value={ summary }
		/>
	);
};

export default DescriptionSave;
