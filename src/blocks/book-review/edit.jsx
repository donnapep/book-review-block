/**
 * External dependencies
 */
import classnames from 'classnames';
import { range } from 'lodash';
import { Component } from '@wordpress/element';

const { __ } = wp.i18n;
const {
	Button,
	Dashicon,
	IconButton,
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
import { Rating } from './rating';

class BookReviewBlock extends Component {
	setCover = ( { alt, id, url } ) => {
		const { setAttributes } = this.props;

		setAttributes( { alt, id, book_review_cover_url: url } );
	}

	updateValue = field => value => {
		const { setAttributes } = this.props;

		setAttributes( { [ field ]: value } );
	}

	render() {
		const {
			attributes: {
				alt,
				backgroundColor,
				id,
				book_review_author,
				book_review_cover_url,
				book_review_format,
				book_review_genre,
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
			},
			className,
			isSelected,
			setAttributes,
		} = this.props;

		// Workaround for deprecated block migrations not saving to meta.
		// This is needed to restore data that was stored in HTML attributes (i.e. post content).
		const currentRating = book_review_rating ? parseFloat( book_review_rating ) : rating;
		const coverUrl = book_review_cover_url ? book_review_cover_url : url;

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
								onSelect={ this.setCover }
								allowedTypes={ [ 'image' ] }
								value={ id }
								render={ ( { open } ) => (
									<IconButton
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
							colorSettings={ [
								{
									value: backgroundColor && backgroundColor.value,
									onChange: this.updateValue( 'backgroundColor' ),
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
						onSelect={ this.setCover } />
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
						onChange={ this.updateValue( 'book_review_title' ) }
						placeholder={ __( 'Title' ) }
						value={ book_review_title ? book_review_title : title }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_series' ) }
						placeholder={ __( 'Series' ) }
						value={ book_review_series ? book_review_series : series }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_author' ) }
						placeholder={ __( 'Author' ) }
						value={ book_review_author ? book_review_author : author }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_genre' ) }
						placeholder={ __( 'Genre' ) }
						value={ book_review_genre ? book_review_genre : genre }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_publisher' ) }
						placeholder={ __( 'Publisher' ) }
						value={ book_review_publisher ? book_review_publisher : publisher }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_release_date' ) }
						placeholder={ __( 'Release Date' ) }
						value={ book_review_release_date ? book_review_release_date : releaseDate }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_format' ) }
						placeholder={ __( 'Format' ) }
						value={ book_review_format ? book_review_format : format }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_pages' ) }
						placeholder={ __( 'Pages' ) }
						value={ book_review_pages ? book_review_pages : pages }
						keepPlaceholderOnFocus />

					<RichText
						onChange={ this.updateValue( 'book_review_source' ) }
						placeholder={ __( 'Source' ) }
						value={ book_review_source ? book_review_source : source }
						keepPlaceholderOnFocus />

					<Rating rating={ currentRating } setAttributes={ setAttributes } />

					<RichText
						multiline="p"
						onChange={ this.updateValue( 'book_review_summary' ) }
						placeholder={ __( 'Description' ) }
						value={ book_review_summary ? book_review_summary : summary }
						wrapperClassName="book-review-block__description"
						inlineToolbar
						keepPlaceholderOnFocus />
				</div>
			</div>
		);
	}
}

export default BookReviewBlock;
