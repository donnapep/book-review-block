/**
 * External dependencies
 */
import {
	Button,
	ExternalLink,
	Notice,
	PanelBody,
	Spinner,
	TextControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { dispatch, select, useSelect } from '@wordpress/data';
import { dateI18n } from '@wordpress/date';
import { InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const allowedBlocks = [
	'core/image',
	'book-review-block/metadata',
	'book-review-block/rating',
	'book-review-block/description',
];
const template = [
	[ 'core/image', {
		align: 'left',
	} ],
	[ 'book-review-block/metadata' ],
	[ 'book-review-block/rating' ],
	[ 'book-review-block/description' ],
];

const apiKeyHelperText = (
	<>
		<ExternalLink href="https://console.developers.google.com/flows/enableapi?apiid=books.googleapis.com&keyType=CLIENT_SIDE&reusekey=true">
			{ __( 'Get an API key.', 'book-review-block' ) }
		</ExternalLink>
		{ __(
			'Note that changing the API key affects all Book Review blocks.',
			'book-review-block'
		) }
	</>
);

function BookReviewBlock( {
	attributes,
	className,
	clientId,
	isSelected,
	setAttributes,
} ) {
	const {
		backgroundColor,
		isbn,
		url,
	} = attributes;
	const classes = classnames( className, 'book-review-block', {
		'has-background': backgroundColor,
	} );

	// Google Books API
	const [ isFetching, setIsFetching ] = useState( false );
	const [ isUpdating, setIsUpdating ] = useState( false );
	const [ bookNotFound, setBookNotFound ] = useState( false );
	const [ booksApiError, setBooksApiError ] = useState( '' );
	const [ apiKeySaveError, setApiKeySaveError ] = useState( '' );
	const [ apiKey, setApiKey ] = useState( '' );
	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const settings = useSelect( ( select ) => select( 'core' ).getEntityRecord(
		'book-review-block/v1',
		'settings',
		undefined
	), [] );

	// Check for book data in post meta.
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	useEffect( () => {
		if ( settings && settings.book_review_api_key ) {
			setApiKey( settings.book_review_api_key );
		}
	}, [ settings ] );

	// Workaround for https://github.com/WordPress/gutenberg/issues/27181.
	useEffect( () => {
		if ( meta['book_review_isbn'] ) {
			setAttributes( { isbn: meta['book_review_isbn'] } );
		}

		if ( meta['book_review_cover_url'] ) {
			const innerBlocks = select( 'core/block-editor' ).getBlocksByClientId( clientId );

			if ( ! innerBlocks.length || ! innerBlocks[0].innerBlocks ) {
				return;
			}

			setAttributes( { url: meta['book_review_cover_url'] } );

			innerBlocks[0].innerBlocks.forEach( block => {
				if ( 'core/image' === block.name ) {
					dispatch( 'core/block-editor' ).updateBlockAttributes(
						block.clientId,
						{
							align: 'left',
							url: meta['book_review_cover_url'],
						}
					);
				}
			} );
		}
	}, [ meta ] );

	const getBookDetails = async () => {
		const apiURL =
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${ isbn }&key=${ encodeURIComponent( apiKey ) }`;

		setIsFetching( true );
		setBookNotFound( false );
		setBooksApiError( '' );

		await fetch( apiURL )
			.then( result => result.json() )
			.then( result => {
				if ( ! result ) {
					return;
				}

				const volume = result.items?.[0].volumeInfo;

				if ( volume ) {
					const innerBlocks = select( 'core/block-editor' ).getBlocksByClientId( clientId );

					if ( ! innerBlocks.length || ! innerBlocks[0].innerBlocks ) {
						return;
					}

					innerBlocks[0].innerBlocks.forEach( block => {
						switch ( block.name ) {
							case 'core/image':
								dispatch( 'core/block-editor' ).updateBlockAttributes(
									block.clientId,
									{ url: volume.imageLinks?.thumbnail ? volume.imageLinks.thumbnail : '' }
								);
								break;
							case 'book-review-block/metadata':
								dispatch( 'core/block-editor' ).updateBlockAttributes(
									block.clientId,
									{
										author: volume.authors && volume.authors.length ? volume.authors.join() : '',
										genre: volume.categories && volume.categories.length ? volume.categories.join() : '',
										pages: volume.pageCount ? volume.pageCount.toString() : '',
										publisher: volume.publisher ? volume.publisher : '',
										releaseDate: volume.publishedDate ? dateI18n( siteFormat, volume.publishedDate ) : '',
										series: '',
										title: volume.title ? volume.title : '',
									}
								);
								break;
							case 'book-review-block/description':
								dispatch( 'core/block-editor' ).updateBlockAttributes(
									block.clientId,
									{
										// Including <p> tag fixes the issue of the description not showing in the editor.
										summary: volume.description ? '<p>' + volume.description + '</p>' : '',
									}
								);
								break;
						}
					} );
				} else if ( result.error?.message ) {
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

	const updateBackgroundColor = value => setAttributes( { backgroundColor: value } );
	const updateValue = field => value => setAttributes( { [ field ]: value } );

	return (
		<div
			className={ classes }
			style={ { backgroundColor } }>

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

					{ settings && (
						<>
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
									value={ isbn ? isbn : '' }
									onChange={ newISBN => setAttributes( { isbn: newISBN } ) }
								/>
								<div>
									<Button
										isSecondary
										disabled={ ! isbn || ! apiKey }
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
						</>
					) }
				</InspectorControls>
			) }

			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ template }
			/>
		</div>
	);
}

export default BookReviewBlock;
