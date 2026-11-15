/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import createDescriptionBlocks from './create-description-blocks';

const v1 = {
	attributes: {
		summary: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__description',
		},
	},

	save( { attributes } ) {
		const blockProps = useBlockProps.save( {
			className: 'book-review-block__description',
		} );

		return <RichText.Content { ...blockProps } tagName="div" value={ attributes.summary } />;
	},

	migrate( { summary, ...attributes } ) {
		return [ attributes, createDescriptionBlocks( summary ) ];
	},
};

export default [ v1 ];
