/**
 * External dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const {
	registerBlockType,
	BlockControls,
	BlockDescription,
	ColorPalette,
	Editable,
	InspectorControls,
	MediaUploadButton,
} = wp.blocks;
const {
	Dashicon,
	FormFileUpload,
	PanelColor,
	Placeholder,
	Toolbar,
} = wp.components;
const { mediaUpload } = wp.utils;

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
	icon: 'book',
	category: 'widgets',
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
			type: 'number',
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

	edit: ( { attributes, className, focus, setAttributes, setFocus } ) => {
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
			rating: currentRating,
			releaseDate,
			series,
			source,
			title,
			url,
		} = attributes;
		const focusedEditable = focus ? focus.editable || 'title' : null;
		const uploadButtonProps = { isLarge: true };
		const updateCover = ( { alt, id, url } ) => setAttributes( { alt, id, url } );
		const updateFocus = field => focusValue => setFocus( { editable: field, ...focusValue } );
		const updateRating = event => setAttributes( { rating: event.target.dataset.rating } );
		const updateValue = field => value => setAttributes( { [ field ]: value } );
		const uploadFromFiles = event => mediaUpload( event.target.files, setAttributes );

		return (
			<div
				className={ classnames( 'book-review-block', className, {
					'has-background': backgroundColor,
				} ) }
				style={ {
					backgroundColor: backgroundColor,
				} }>
				{ !! focus && (
					<BlockControls key="controls">
						<Toolbar>
							<MediaUploadButton
								buttonProps={ {
									className: 'components-icon-button components-toolbar__control',
									'aria-label': __( 'Edit Book Cover' ),
								} }
								onSelect={ updateCover }
								type="image"
								value={ id }>
								<Dashicon icon="edit" />
							</MediaUploadButton>
						</Toolbar>
					</BlockControls>
				) }

				{ focus && (
					<InspectorControls key="inspector">
						<BlockDescription>
							<p>{ __( 'Add book details such as title, author, publisher and cover image to enhance your review posts.' ) }</p>
						</BlockDescription>

						<PanelColor
							colorValue={ backgroundColor }
							title={ __( 'Background Color' ) }>
							<ColorPalette
								onChange={ updateValue( 'backgroundColor' ) }
								value={ backgroundColor }
							/>
						</PanelColor>
					</InspectorControls>
				) }

				{ ! url && (
					<Placeholder
						icon="format-image"
						instructions={ __( 'Upload or insert book cover from media library' ) }
						key="placeholder"
						label={ __( 'Book Cover' ) }>

						<FormFileUpload
							accept="image/*"
							className="book-review-block__upload-button"
							onChange={ uploadFromFiles }
							isLarge>
							{ __( 'Upload' ) }
						</FormFileUpload>

						<MediaUploadButton
							buttonProps={ uploadButtonProps }
							onSelect={ updateCover }
							type="image">
							{ __( 'Insert from Media Library' ) }
						</MediaUploadButton>

					</Placeholder>
				) }

				{ !! url && (
					<div className="book-review-block__cover-wrapper">
						<img
							alt={ alt }
							className="book-review-block__cover"
							onClick={ setFocus }
							src={ url } />
					</div>
				) }

				<div className="book-review-block__details">
					<Editable
						focus={ focusedEditable === 'title' ? focus : null }
						onChange={ updateValue( 'title' ) }
						onFocus={ updateFocus( 'title' ) }
						placeholder={ __( 'Enter title…' ) }
						tagName="span"
						value={ title }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'series' ? focus : null }
						onChange={ updateValue( 'series' ) }
						onFocus={ updateFocus( 'series' ) }
						placeholder={ __( 'Enter series…' ) }
						tagName="span"
						value={ series }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'author' ? focus : null }
						onChange={ updateValue( 'author' ) }
						onFocus={ updateFocus( 'author' ) }
						placeholder={ __( 'Enter author…' ) }
						tagName="span"
						value={ author }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'genre' ? focus : null }
						onChange={ updateValue( 'genre' ) }
						onFocus={ updateFocus( 'genre' ) }
						placeholder={ __( 'Enter genre…' ) }
						tagName="span"
						value={ genre }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'publisher' ? focus : null }
						onChange={ updateValue( 'publisher' ) }
						onFocus={ updateFocus( 'publisher' ) }
						placeholder={ __( 'Enter publisher…' ) }
						tagName="span"
						value={ publisher }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'releaseDate' ? focus : null }
						onChange={ updateValue( 'releaseDate' ) }
						onFocus={ updateFocus( 'releaseDate' ) }
						placeholder={ __( 'Enter release date…' ) }
						tagName="span"
						value={ releaseDate }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'format' ? focus : null }
						onChange={ updateValue( 'format' ) }
						onFocus={ updateFocus( 'format' ) }
						placeholder={ __( 'Enter format…' ) }
						tagName="span"
						value={ format }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'pages' ? focus : null }
						onChange={ updateValue( 'pages' ) }
						onFocus={ updateFocus( 'pages' ) }
						placeholder={ __( 'Enter pages…' ) }
						tagName="span"
						value={ pages }
						keepPlaceholderOnFocus />

					<Editable
						focus={ focusedEditable === 'source' ? focus : null }
						onChange={ updateValue( 'source' ) }
						onFocus={ updateFocus( 'source' ) }
						placeholder={ __( 'Enter source…' ) }
						tagName="span"
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

					<Editable
						focus={ focusedEditable === 'description' ? focus : null }
						multiline="p"
						onChange={ updateValue( 'description' ) }
						onFocus={ updateFocus( 'description' ) }
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
			rating: currentRating,
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
								className={ currentRating && currentRating >= rating ? 'on' : 'off' }
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
