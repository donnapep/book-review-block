/**
 * External dependencies
 */
const { __ } = wp.i18n;
const {
	getCategories,
	setCategories,
} = wp.blocks;

setCategories( [
	...getCategories().filter( ( { slug } ) => slug !== 'book-review' ),
	{
		icon: 'book',
		slug: 'book-review',
		title: __( 'Book Review', 'book-review-block' ),
	},
] );
