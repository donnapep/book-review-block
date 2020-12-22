/**
 * External dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		isbn,
	} = attributes;
	const classes = classnames( 'book-review-block', {
		'has-background': backgroundColor,
	} );

	return (
		<div
			itemscope
			itemtype="https://schema.org/Book"
			className={ classes }
			style={ { backgroundColor } }
		>
			{ isbn && (
				<meta
					itemprop="isbn"
					content={ isbn }
				/>
			) }
			<InnerBlocks.Content />
		</div>
	);
}

export default save;
