/**
 * External dependencies
 */
import classnames from 'classnames';

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
	PanelColor,
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
		author: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__author',
		},
		backgroundColor: {
			type: 'string',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.book-review-block__description',
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
		id: {
			type: 'number',
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
			author,
			backgroundColor,
			description,
			format,
			genre,
			id,
			pages,
			publisher,
			rating: reviewRating,
			releaseDate,
			series,
			source,
			title,
			url,
		} = attributes;
		const setCover = ( { alt, id, url } ) => setAttributes( { alt, id, url } );
		const updateRating = event => setAttributes( { rating: event.target.dataset.rating } );
		const updateValue = field => value => {
			setAttributes( { [ field ]: value } );
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
								type="image"
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
						<PanelColor
							colorValue={ backgroundColor }
							onChange={ updateValue( 'backgroundColor' ) }
							title={ __( 'Background Color' ) }
						/>
					</InspectorControls>
				) }

				{ ! url && (
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

				{ !! url && (
					<div className="book-review-block__cover-wrapper">
						<img
							alt={ alt }
							className="book-review-block__cover"
							src={ url } />
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
								className={ reviewRating && rating <= reviewRating ? 'on' : 'off' }
								data-rating={ rating }
								key={ rating }
								title={ title }>
								&#9734;
							</span>
						) ) }
					</div>

					<RichText
						multiline="p"
						onChange={ updateValue( 'description' ) }
						placeholder={ __( 'Enter description…' ) }
						value={ description }
						wrapperClassName="book-review-block__description"
						inlineToolbar
						keepPlaceholderOnFocus />
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		const {
			alt,
			author = [],
			backgroundColor,
			description = [],
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

					{ description.length > 0 && <div className="book-review-block__description">{ description }</div> }
				</div>
			</div>
		);
	}
} );
