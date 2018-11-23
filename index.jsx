/**
 * External dependencies
 */
import classnames from 'classnames';
import { autop } from '@wordpress/autop';

const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Button,
	Dashicon,
	Toolbar,
} = wp.components;
const {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	RichText,
} = wp.editor;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const ratings = [
	{ rating: 5, title: 'it was amazing' },
	{ rating: 4, title: 'really liked it' },
	{ rating: 3, title: 'liked it' },
	{ rating: 2, title: 'it was ok' },
	{ rating: 1, title: 'did not like it' },
];
function isOldVersion( attributes ) {
	return attributes.details.length !== 0;
}

registerBlockType( 'book-review-block/book-review', {
	title: 'Book Review',
	description: 'Add book details such as title, author, publisher and cover image to enhance your review posts.',
	icon: 'book',
	category: 'widgets',
	supports: {
		anchor: true,
		multiple: false,
	},
	attributes: {
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},
		backgroundColor: {
			type: 'string',
		},
		id: {
			type: 'number',
		},
		book_review_author: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_author',
		},
		book_review_cover_url: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_cover_url',
		},
		book_review_format: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_format',
		},
		book_review_genre: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_genre',
		},
		book_review_pages: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_pages',
		},
		book_review_publisher: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_publisher',
		},
		book_review_rating: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_rating',
		},
		book_review_release_date: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_release_date',
		},
		book_review_series: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_series',
		},
		book_review_source: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_source',
		},
		book_review_summary: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_summary',
		},
		book_review_title: {
			type: 'string',
			source: 'meta',
			meta: 'book_review_title',
		},
		/* Old attributes for backwards compatibility */
		/* If any of these have a value, then this is the old version. */
		author: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__author',
		},
		details: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__details'
		},
		format: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__format',
		},
		genre: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__genre',
		},
		pages: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__pages',
		},
		publisher: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__publisher',
		},
		rating: {
			type: 'string',
		},
		releaseDate: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__release-date',
		},
		series: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__series',
		},
		source: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__source',
		},
		summary: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__description',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__title',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},

	edit: ( { attributes, className, isSelected, setAttributes } ) => {
		const {
			alt,
			backgroundColor,
			id,
		} = attributes;
		const isOldBlock = isOldVersion( attributes );

		// Set old (HTML) attributes to undefined so data will be stored to new (meta) attributes.
		if ( ! isOldBlock ) {
			attributes.author = undefined;
			attributes.format = undefined;
			attributes.genre = undefined;
			attributes.pages = undefined;
			attributes.publisher = undefined;
			attributes.rating = undefined;
			attributes.releaseDate = undefined;
			attributes.series = undefined;
			attributes.source = undefined;
			attributes.summary = undefined;
			attributes.title = undefined;
			attributes.url = undefined;
		}

		// If HTML attributes are undefined, use the meta attributes.
		const {
			author: author = attributes.book_review_author,
			format: format = attributes.book_review_format,
			genre: genre = attributes.book_review_genre,
			pages: pages = attributes.book_review_pages,
			publisher: publisher = attributes.book_review_publisher,
			rating: currentRating = attributes.book_review_rating,
			releaseDate = attributes.book_review_release_date,
			series: series = attributes.book_review_series,
			source: source = attributes.book_review_source,
			summary: summary = attributes.book_review_summary,
			title: title = attributes.book_review_title,
			url: coverUrl = attributes.book_review_cover_url,
		} = attributes;

		const setCover = ( { alt, id, url } ) => {
			if ( ! isOldBlock ) {
				setAttributes( { alt, id, book_review_cover_url: url } );
			} else {
				setAttributes( { alt, id, url } );
			}
		}
		const updateBackgroundColor = value => setAttributes( { backgroundColor: value } );
		const updateRating = event => {
			if ( ! isOldBlock ) {
				setAttributes( { book_review_rating: event.target.dataset.rating } );
			} else {
				setAttributes( { rating: event.target.dataset.rating } );
			}
		}
		const updateValue = field => value => {
			if ( ! isOldBlock ) {
				field = 'book_review_' + field;
			}

			setAttributes( { [ field ]: value } );
		}
		const updateSummary = summary => {
			if ( ! isOldBlock ) {
				setAttributes( { book_review_summary: [summary] } );
			} else {
				setAttributes( { [ 'summary' ]: summary } );
			}
		}

		return (
			<div
				className={ classnames( 'book-review-block', className, {
					'has-background': backgroundColor,
				} ) }
				style={ {
					backgroundColor: backgroundColor,
				} }>
				{ isSelected && (
					<BlockControls key="controls">
						<Toolbar>
							<MediaUpload
								onSelect={ setCover }
								allowedTypes={ [ 'image' ] }
								value={ id }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										<Dashicon icon="edit" />
										{ __( 'Edit Book Cover' ) }
									</Button>
								) }
							/>
						</Toolbar>
					</BlockControls>
				) }

				{ isSelected && (
					<InspectorControls key="inspector">
						<PanelColorSettings
							colorSettings={ [
								{
									value: backgroundColor && backgroundColor.value,
									onChange: updateBackgroundColor,
									label: __( 'Background Color' ),
								},
							] }
						/>
					</InspectorControls>
				) }

				{ ! coverUrl && (
					<MediaPlaceholder
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						icon="format-image"
						instructions={ __( 'Upload or insert book cover from media library' ) }
						labels={ {
							title: __( 'Book Cover' ),
							name: __( 'an image' ),
						} }
						onSelect={ setCover } />
				) }

				{ !! coverUrl && (
					<div className="book-review-block__cover-wrapper">
						<img
							alt={ alt }
							className="book-review-block__cover"
							src={ coverUrl } />
					</div>
				) }

				<div className="book-review-block__details">
					<RichText
						onChange={ updateValue( 'title' ) }
						placeholder={ __( 'Enter title…' ) }
						value={ title }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'series' ) }
						placeholder={ __( 'Enter series…' ) }
						value={ series }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'author' ) }
						placeholder={ __( 'Enter author…' ) }
						value={ author }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'genre' ) }
						placeholder={ __( 'Enter genre…' ) }
						value={ genre }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'publisher' ) }
						placeholder={ __( 'Enter publisher…' ) }
						value={ publisher }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'releaseDate' ) }
						placeholder={ __( 'Enter release date…' ) }
						value={ releaseDate }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'format' ) }
						placeholder={ __( 'Enter format…' ) }
						value={ format }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'pages' ) }
						placeholder={ __( 'Enter pages…' ) }
						value={ pages }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ updateValue( 'source' ) }
						placeholder={ __( 'Enter source…' ) }
						value={ source }
						keepPlaceholderOnFocus />

					<div
						className="book-review-block__rating"
						onClick={ updateRating }>
						{ ratings.map( ( { rating, title } ) => (
							<span
								className={ currentRating && currentRating >= rating ? 'on' : 'off' }
								data-rating={ rating }
								key={ rating }
								title={ title }>
								&#9734;
							</span>
						) ) }
					</div>

					<RichText
						multiline="p"
						onChange={ updateSummary }
						placeholder={ __( 'Enter description…' ) }
						value={ isOldBlock || summary.length === 0 ? summary : autop( summary[0] ) }
						wrapperClassName="book-review-block__description"
						inlineToolbar
						keepPlaceholderOnFocus />
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		if ( ! isOldVersion( attributes ) ) {
			return null;
		}

		const {
			alt,
			author = [],
			backgroundColor,
			summary = [],
			format = [],
			genre = [],
			pages = [],
			publisher = [],
			rating: reviewRating,
			releaseDate = [],
			series = [],
			source = [],
			title = [],
			url,
		} = attributes;
		const className = classnames( 'book-review-block', {
			'has-background': backgroundColor,
		} );
		const styles = {
			backgroundColor: backgroundColor,
		};

		return (
			<div
				className={ className }
				style={ styles }>
				{ !! url && (
					<div className="book-review-block__cover-wrapper">
						<img className="book-review-block__cover" src={ url } alt={ alt } />
					</div>
				) }
				<div className="book-review-block__details">
					{ title.length > 0 && <span className="book-review-block__title">{ title }</span> }
					{ series.length > 0 && <span className="book-review-block__series">{ series }</span> }
					{ author.length > 0 && <span className="book-review-block__author">{ author }</span> }
					{ genre.length > 0 && <span className="book-review-block__genre">{ genre }</span> }
					{ publisher.length > 0 && <span className="book-review-block__publisher">{ publisher }</span> }
					{ releaseDate.length > 0 && <span className="book-review-block__release-date">{ releaseDate }</span> }
					{ format.length > 0 && <span className="book-review-block__format">{ format }</span> }
					{ pages.length > 0 && <span className="book-review-block__pages">{ pages }</span> }
					{ source.length > 0 && <span className="book-review-block__source">{ source }</span> }

					<div className="book-review-block__rating">
						{ ratings.map( ( { rating } ) => (
							<span
								className={ reviewRating && rating <= reviewRating ? 'on' : 'off' }
								data-rating={ rating }
								key={ rating }>
								&#9734;
							</span>
						) ) }
					</div>

					{ summary.length > 0 && <div className="book-review-block__description">{ summary }</div> }
				</div>
			</div>
		);
	}
} );
