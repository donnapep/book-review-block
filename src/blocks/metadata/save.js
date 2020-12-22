/**
 * External dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const MetadataSave = ( { attributes } ) => {
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

	return (
		<div className="book-review-block__meta">
			<div className="book-review-block__meta-item book-review-block__meta-item-title">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Title:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="name"
					value={ title }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-series">
				{ showLabels && (
					<span className="book-review-block__meta-item-label">
						{ __( 'Series:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					value={ series }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div
				itemscope
				itemtype="https://schema.org/Person"
				itemprop="author"
				className="book-review-block__meta-item book-review-block__meta-item-author">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Author:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="name"
					value={ author }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-genre">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Genre:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="genre"
					value={ genre }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div
				itemscope
				itemtype="https://schema.org/Organization"
				itemprop="publisher"
				className="book-review-block__meta-item book-review-block__meta-item-publisher">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Publisher:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="name"
					value={ publisher }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-release-date">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Release Date:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="datePublished"
					value={ releaseDate }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-format">
				{ showLabels && (
					<span className="book-review-block__meta-item-label">
						{ __( 'Format:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					value={ format }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-pages">
				{ showLabels && (
					<span
						className="book-review-block__meta-item-label">
						{ __( 'Pages:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					itemprop="numberOfPages"
					value={ pages }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>

			<div className="book-review-block__meta-item book-review-block__meta-item-source">
				{ showLabels && (
					<span className="book-review-block__meta-item-label">
						{ __( 'Source:', 'book-review-block' ) }
					</span>
				) }
				<RichText.Content
					value={ source }
					className="book-review-block__meta-item-value"
					tagName="div"
				/>
			</div>
		</div>
	);
}

export default MetadataSave;
