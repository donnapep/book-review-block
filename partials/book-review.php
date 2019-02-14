<?php
/**
 * Represents the view for the public-facing component of the plugin.
 *
 * This typically includes any information, if any, that is rendered to the
 * frontend of the theme when the plugin is activated.
 *
 * @package   Book_Review
 * @author    Donna Peplinskie <support@wpreviewplugins.com>
 * @license   GPL-2.0+
 * @link      http://wpreviewplugins.com/
 * @copyright 2014 Donna Peplinskie
 */
?>

<div
	itemscope
	class="book-review-block<?php if ( ! empty( $background_color ) ) echo ' has-background'; ?>"
	itemtype="http://schema.org/Review"
	style="background-color: <?php echo esc_attr( $background_color ); ?>">

	<!-- Meta for schema.org -->
	<meta
		content="<?php echo esc_attr( get_the_title() ); ?>"
		itemprop="headline">
	<!-- author is mandatory! -->
	<meta
		content="<?php echo esc_attr( get_the_author() ); ?>"
		itemprop="author">
	<meta
		content="<?php esc_attr( the_date( 'Y-m-d' ) ); ?>"
		itemprop="datePublished">

	<!-- Cover -->
	<?php if ( ! empty( $cover_url ) ): ?>
	<div class="book-review-block__cover-wrapper">
		<img
			alt="<?php echo esc_attr( $title . ' ' . __( 'Book Cover', 'book-review-block' ) ); ?>"
			class="book-review-block__cover"
			itemprop="image"
			src="<?php echo esc_url( $cover_url ); ?>">
	</div>
	<?php endif; ?>

	<div class="book-review-block__details">
		<!-- Title -->
		<?php if ( ! empty( $title ) ): ?>
		<span
			itemscope
			itemprop="itemReviewed"
			itemtype="http://schema.org/Thing">
			<span
				class="book-review-block__title"
				itemprop="name">
				<?php echo wp_kses_post( $title ); ?>
			</span>
		</span>
		<?php endif; ?>

		<!-- Series -->
		<?php if ( ! empty( $series ) ): ?>
		<span class="book-review-block__series">
			<?php echo wp_kses_post( $series ); ?>
		</span>
		<?php endif; ?>

		<!-- Author -->
		<?php if ( ! empty( $author ) ): ?>
		<span class="book-review-block__author">
			<?php echo wp_kses_post( $author ); ?>
		</span>
		<?php endif; ?>

		<!-- Genre -->
		<?php if ( ! empty( $genre ) ): ?>
		<span
			class="book-review-block__genre"
			itemprop="genre">
			<?php echo wp_kses_post( $genre ); ?>
		</span>
		<?php endif; ?>

		<!-- Publisher -->
		<?php if ( ! empty( $publisher ) ): ?>
		<span
			class="book-review-block__publisher"
			itemprop="publisher">
			<?php echo wp_kses_post( $publisher ); ?>
		</span>
		<?php endif; ?>

		<!-- Release Date -->
		<?php if ( ! empty( $release_date ) ): ?>
		<span class="book-review-block__release-date">
			<?php echo wp_kses_post( $release_date ); ?>
		</span>
		<?php endif; ?>

		<!-- Format -->
		<?php if ( ! empty( $format ) ): ?>
		<span class="book-review-block__format">
			<?php echo wp_kses_post( $format ); ?>
		</span>
		<?php endif; ?>

		<!-- Pages -->
		<?php if ( ! empty( $pages ) ): ?>
		<span class="book-review-block__pages">
			<?php echo wp_kses_post( $pages ); ?>
		</span>
		<?php endif; ?>

		<!-- Source -->
		<?php if ( ! empty( $source ) ): ?>
		<span class="book-review-block__source">
			<?php echo wp_kses_post( $source ); ?>
		</span>
		<?php endif; ?>

		<!-- Rating -->
		<?php if ( ! empty( $rating_html ) ): ?>
		<div
			itemscope
			class="book-review-block__rating"
			itemprop="reviewRating"
			itemtype="http://schema.org/Rating">
			<meta
				content="<?php echo esc_attr( $this->get_post_meta( 'book_review_rating' ) ); ?>"
				itemprop="ratingValue">
			<?php echo wp_kses_post( implode( $rating_html ) ); ?>
		</div>
		<?php endif; ?>

		<!-- Summary / Synopsis -->
		<?php if ( ! empty( $summary ) ): ?>
		<div class="book-review-block__description">
			<?php echo wpautop( wp_kses_post( $summary ) ); ?>
		</div>
		<?php endif; ?>
	</div>
</div>
