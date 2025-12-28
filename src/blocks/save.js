/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		isbn,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: classnames( 'book-review-block', {
			'has-background': backgroundColor,
		} ),
		style: { backgroundColor },
		itemScope: true,
		itemType: 'https://schema.org/Book',
	} );

	return (
		<div { ...blockProps }>
			{ isbn && (
				<meta
					itemProp="isbn"
					content={ isbn }
				/>
			) }
			<InnerBlocks.Content />
		</div>
	);
}

export default save;
