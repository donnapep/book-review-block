/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const v1 = {
	attributes: {
		author: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-author .book-review-block__meta-item-value',
			default: ''
		},
		format: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-format .book-review-block__meta-item-value',
			default: ''
		},
		genre: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-genre .book-review-block__meta-item-value',
			default: ''
		},
		pages: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-pages .book-review-block__meta-item-value',
			default: ''
		},
		publisher: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-publisher .book-review-block__meta-item-value',
			default: ''
		},
		releaseDate: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-release-date .book-review-block__meta-item-value',
			default: ''
		},
		series: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-series .book-review-block__meta-item-value',
			default: ''
		},
		source: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-source .book-review-block__meta-item-value',
			default: ''
		},
		title: {
			type: 'string',
			source: 'html',
			selector: '.book-review-block__meta-item-title .book-review-block__meta-item-value',
			default: ''
		},
		showLabels: {
			type: 'boolean',
			default: false
		},
	},

	save( { attributes } ) {
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
	},
};

export default [ v1 ];
