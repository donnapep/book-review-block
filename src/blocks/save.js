/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
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

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return (
		<div { ...innerBlocksProps }>
			{ isbn && <meta itemProp="isbn" content={ isbn } /> }
			{ innerBlocksProps.children }
		</div>
	);
}

export default save;
