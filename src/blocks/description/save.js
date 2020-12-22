/**
 * External dependencies
 */
import { RichText } from '@wordpress/block-editor';

const DescriptionSave = ( { attributes } ) => {
	const { summary } = attributes;

	return (
		<div className="book-review-block__description">
			<RichText.Content
				multiline="p"
				value={ summary }
			/>
		</div>
	);
}

export default DescriptionSave;
