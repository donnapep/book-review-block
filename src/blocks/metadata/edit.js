/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const MetadataEdit = ( { attributes, setAttributes } ) => {
	const {
		author,
		format,
		genre,
		pages,
		publisher,
		releaseDate,
		series,
		showLabels,
		source,
		title,
	} = attributes;

	// Workaround for https://github.com/WordPress/gutenberg/issues/27181.
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	useEffect( () => {
		// Use title as indicator that this block stored data in post meta.
		if ( meta['book_review_title'] ) {
			setAttributes( { title: meta['book_review_title'] } );
			setAttributes( { series: meta['book_review_series'] } );
			setAttributes( { author: meta['book_review_author'] } );
			setAttributes( { genre: meta['book_review_genre'] } );
			setAttributes( { publisher: meta['book_review_publisher'] } );
			setAttributes( { releaseDate: meta['book_review_release_date'] } );
			setAttributes( { format: meta['book_review_format'] } );
			setAttributes( { pages: meta['book_review_pages'] } );
			setAttributes( { source: meta['book_review_source'] } );
		}
	}, [ meta ] );

	const updateValue = field => value => {
		setAttributes( { [ field ]: value } );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'book-review-block' ) }>
					<ToggleControl
						label={ __(
							'Show labels',
							'book-review-block'
						) }
						help={ __(
							'Whether to show labels beside each piece of metadata',
							'book-review-block'
						) }
						checked={ showLabels }
						onChange={ () =>
							setAttributes( { showLabels: ! showLabels } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="book-review-block__meta">
				<div className="book-review-block__meta-item book-review-block__meta-item-title">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Title:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write title…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'title' ) }
						value={ title } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-series">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Series:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write series…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'series' ) }
						value={ series } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-author">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Author:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write author…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'author' ) }
						value={ author } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-genre">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Genre:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write genre…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'genre' ) }
						value={ genre } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-publisher">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Publisher:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write publisher…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'publisher' ) }
						value={ publisher } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-release-date">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Release Date:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write release date…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ releaseDate => setAttributes( { releaseDate: releaseDate } ) }
						value={ releaseDate } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-format">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Format:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write format…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'format' ) }
						value={ format } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-pages">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Pages:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write pages…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'pages' ) }
						value={ pages } />
				</div>

				<div className="book-review-block__meta-item book-review-block__meta-item-source">
					{ showLabels && (
						<span className="book-review-block__meta-item-label">
							{ __(
								'Source:',
								'book-review-block'
							) }
						</span>
					) }
					<RichText
						placeholder={ __(
							'Write source…',
							'book-review-block'
						) }
						className="book-review-block__meta-item-value"
						onChange={ updateValue( 'source' ) }
						value={ source } />
				</div>
			</div>
		</>
	);
};

export default MetadataEdit;
