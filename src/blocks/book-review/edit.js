/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	ExternalLink,
	Notice,
	PanelBody,
	Spinner,
	TextControl,
	Toolbar,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { dispatch, withSelect } from '@wordpress/data';
import { dateI18n } from '@wordpress/date';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Rating } from './rating';

function BookReviewBlock( {
	attributes,
	className,
	isRequesting,
	isSelected,
	setAttributes,
	settings,
} ) {
	const {
		alt,
		backgroundColor,
		id,
		book_review_author,
		book_review_cover_url,
		book_review_format,
		book_review_genre,
		book_review_isbn,
		book_review_pages,
		book_review_publisher,
		book_review_rating,
		book_review_release_date,
		book_review_series,
		book_review_source,
		book_review_summary,
		book_review_title,
		// Deprecated attributes
		author,
		format,
		genre,
		pages,
		publisher,
		rating,
		releaseDate,
		series,
		source,
		summary,
		title,
		url,
	} = attributes;

	// Workaround for deprecated block migrations not saving to meta.
	// This is needed to restore data that was stored in HTML attributes (i.e. post content).
	const currentRating = book_review_rating ? parseFloat( book_review_rating ) : rating;
	const coverUrl = book_review_cover_url ? book_review_cover_url : url;

	const [ isFetching, setIsFetching ] = useState( false );
	const [ isUpdating, setIsUpdating ] = useState( false );
	const [ bookNotFound, setBookNotFound ] = useState( false );
	const [ booksApiError, setBooksApiError ] = useState( '' );
	const [ apiKeySaveError, setApiKeySaveError ] = useState( '' );
	const [ apiKey, setApiKey ] = useState( '' );
	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const apiKeyHelperText = (
		<Fragment>
			<ExternalLink href="https://console.developers.google.com/flows/enableapi?apiid=books.googleapis.com&keyType=CLIENT_SIDE&reusekey=true">
				{ __( 'Get an API key.', 'book-review-block' ) }
			</ExternalLink>
			{ __(
				'Note that changing the API key affects all Book Review blocks.',
				'book-review-block'
			) }
		</Fragment>
	);

	useEffect( () => {
		if ( isRequesting ) {
			return;
		}

		if ( settings && settings.book_review_api_key ) {
			setApiKey( settings.book_review_api_key );
		}
	}, [ isRequesting ] );

	const getBookDetails = async () => {
		const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ book_review_isbn }&key=${ encodeURIComponent( apiKey ) }`;

		setIsFetching( true );
		setBookNotFound( false );
		setBooksApiError( '' );

		await fetch( url )
			.then( result => result.json() )
			.then( result => {
				if ( ! result ) {
					return;
				}

				if ( result.items && result.items.length > 0 && result.items[0].volumeInfo ) {
					let volume = result.items[0].volumeInfo;

					clearBookDetails();

					volume.title && updateValue( 'book_review_title' )( volume.title );
					volume.authors && volume.authors.length > 0 && updateValue( 'book_review_author' )( volume.authors.join() );
					volume.categories && volume.categories.length > 0 && updateValue( 'book_review_genre' )( volume.categories.join() );
					volume.publisher && updateValue( 'book_review_publisher' )( volume.publisher );
					volume.publishedDate && updateValue( 'book_review_release_date' )( dateI18n( siteFormat, volume.publishedDate ) );
					volume.pageCount && updateValue( 'book_review_pages' )( volume.pageCount.toString() );
					volume.imageLinks && volume.imageLinks.thumbnail && updateValue( 'book_review_cover_url' )( volume.imageLinks.thumbnail );
					volume.description && updateValue( 'book_review_summary' )( '<p>' + volume.description + '</p>' );
				} else if ( result.error && result.error.message ) {
					setBooksApiError( result.error.message );
				} else if ( ! result.items ) {
					setBookNotFound( true );
				}
			} )
			.catch( error => {
				setBooksApiError( error );
			} )
			.finally( () => {
				setIsFetching( false );
			} );
	}

	const clearBookDetails = () => {
		updateValue( 'book_review_cover_url' )( '' );
		updateValue( 'book_review_title' )( '' );
		updateValue( 'book_review_series' )( '' );
		updateValue( 'book_review_author' )( '' );
		updateValue( 'book_review_genre' )( '' );
		updateValue( 'book_review_publisher' )( '' );
		updateValue( 'book_review_release_date' )( '' );
		updateValue( 'book_review_format' )( '' );
		updateValue( 'book_review_pages' )( '' );
		updateValue( 'book_review_source' )( '' );
		updateValue( 'book_review_summary' )( '' );
	}

	const updateApiKeyValue = key => setApiKey( key );

	const updateAPIKey = () => {
		const { saveEntityRecord } = dispatch( 'core' );

		setIsUpdating( true );

		saveEntityRecord( 'book-review-block/v1', 'settings', { book_review_api_key: apiKey } )
			.catch( error => {
				setApiKeySaveError( error );
			} )
			.finally( () => {
				setIsUpdating( false );
			} );
	}

	const setCover = ( { alt, id, url } ) => setAttributes( { alt, id, book_review_cover_url: url } );
	const updateValue = field => value => setAttributes( { [ field ]: value } );

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
								<Button
									label={ __( 'Edit Book Cover', 'book-review-block' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				</BlockControls>
			) }

			{ isSelected && (
				<InspectorControls key="inspector">
					<PanelColorSettings
						initialOpen={ false }
						title={ __( 'Color Settings', 'book-review-block'  ) }
						colorSettings={ [
							{
								value: backgroundColor && backgroundColor.value,
								onChange: updateValue( 'backgroundColor' ),
								label: __( 'Background Color', 'book-review-block' ),
							},
						] }
					/>

					<PanelBody title={ __( 'ISBN', 'book-review-block' ) } initialOpen={ false }>
						{ bookNotFound && (
							<Notice
								className="book-review-block__sidebar-notice"
								status="error"
								isDismissible={ false }
							>
								{ __( 'A book with that ISBN was not found.', 'book-review-block' ) }
							</Notice>
						) }

						{ booksApiError && (
							<Notice
								className="book-review-block__sidebar-notice"
								status="error"
								isDismissible={ false }
							>
								{ __( booksApiError, 'book-review-block' ) }
							</Notice>
						) }

						<TextControl
							help={ __( 'Enter the ISBN to automatically fill in the book details. You will need to have an API key first.', 'book-review-block' ) }
							placeholder={ __( 'ISBN', 'book-review-block' ) }
							value={ book_review_isbn ? book_review_isbn : '' }
							onChange={ updateValue( 'book_review_isbn' ) }
						/>
						<div>
							<Button
								isSecondary
								disabled={ ! book_review_isbn }
								onClick={ getBookDetails }>
								{ __( 'Get Book Details', 'book-review-block' ) }
							</Button>

							{ isFetching && <Spinner /> }
						</div>
					</PanelBody>

					<PanelBody title={ __( 'API Key', 'book-review-block' ) } initialOpen={ false }>
						{ apiKeySaveError && (
							<Notice
								className="book-review-block__sidebar-notice"
								status="error"
								isDismissible={ false }
							>
								{ __( apiKeySaveError, 'book-review-block' ) }
							</Notice>
						) }

						<TextControl
							help={ apiKeyHelperText }
							placeholder={ __( 'API Key', 'book-review-block' ) }
							value={ apiKey }
							onChange={ updateApiKeyValue }
						/>
						<div>
							<Button
								isSecondary
								disabled={ ! apiKey }
								onClick={ updateAPIKey }>
								{ __( 'Save API Key', 'book-review-block' ) }
							</Button>

							{ isUpdating && <Spinner /> }
						</div>
					</PanelBody>
				</InspectorControls>
			) }

			{ ! coverUrl && (
				<MediaPlaceholder
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					icon="format-image"
					instructions={ __( 'Upload or insert book cover from media library', 'book-review-block' ) }
					labels={ {
						title: __( 'Book Cover', 'book-review-block' ),
						name: __( 'an image', 'book-review-block' ),
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
					onChange={ updateValue( 'book_review_title' ) }
					placeholder={ __( 'Title', 'book-review-block' ) }
					value={ book_review_title ? book_review_title : title }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_series' ) }
					placeholder={ __( 'Series', 'book-review-block' ) }
					value={ book_review_series ? book_review_series : series }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_author' ) }
					placeholder={ __( 'Author', 'book-review-block' ) }
					value={ book_review_author ? book_review_author : author }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_genre' ) }
					placeholder={ __( 'Genre', 'book-review-block' ) }
					value={ book_review_genre ? book_review_genre : genre }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_publisher' ) }
					placeholder={ __( 'Publisher', 'book-review-block' ) }
					value={ book_review_publisher ? book_review_publisher : publisher }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_release_date' ) }
					placeholder={ __( 'Release Date', 'book-review-block' ) }
					value={ book_review_release_date ? book_review_release_date : releaseDate }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_format' ) }
					placeholder={ __( 'Format', 'book-review-block' ) }
					value={ book_review_format ? book_review_format : format }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_pages' ) }
					placeholder={ __( 'Pages', 'book-review-block' ) }
					value={ book_review_pages ? book_review_pages : pages }
					keepPlaceholderOnFocus />

				<RichText
					onChange={ updateValue( 'book_review_source' ) }
					placeholder={ __( 'Source', 'book-review-block' ) }
					value={ book_review_source ? book_review_source : source }
					keepPlaceholderOnFocus />

				<Rating rating={ currentRating } setAttributes={ setAttributes } />

				<RichText
					multiline="p"
					onChange={ updateValue( 'book_review_summary' ) }
					placeholder={ __( 'Description', 'book-review-block' ) }
					value={ book_review_summary ? book_review_summary : summary }
					className="book-review-block__description"
					inlineToolbar
					keepPlaceholderOnFocus />
			</div>
		</div>
	);
}

export default compose( [
	withSelect( select => {
		const { isResolving } = wp.data.select( 'core/data' );

		return {
			isRequesting: isResolving( 'core', 'getEntityRecord', [ 'book-review-block/v1', 'settings' ] ),
			settings: select( 'core' ).getEntityRecord( 'book-review-block/v1', 'settings' ),
		};
	} ),
] )( BookReviewBlock );
