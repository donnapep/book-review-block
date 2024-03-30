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
 */
?>

<div itemscope itemtype="http://schema.org/Book"
	class="book-review-block<?php if ( ! empty( $background_color ) ) echo ' has-background'; ?>"
	style="background-color: <?php echo esc_attr( $background_color ); ?>">

	<!-- Cover -->
	<?php if ( ! empty( $cover_url ) ): ?>
	<div class="book-review-block__cover-wrapper">
		<img itemprop="image"
			alt="<?php echo esc_attr( $title . ' ' . __( 'Book Cover', 'book-review-block' ) ); ?>"
			class="book-review-block__cover"
			src="<?php echo esc_url( $cover_url ); ?>">
	</div>
	<?php endif; ?>

	<div class="book-review-block__details">
		<!-- Title -->
		<?php if ( ! empty( $title ) ): ?>
		<span itemprop="name"
			class="book-review-block__title">
			<?php echo wp_kses_post( $title ); ?>
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
		<span itemscope itemtype="https://schema.org/Person" itemprop="author">
			<span itemprop="name"
				class="book-review-block__author">
				<?php echo wp_kses_post( $author ); ?>
			</span>
		</span>
		<?php endif; ?>

		<!-- Genre -->
		<?php if ( ! empty( $genre ) ): ?>
		<span itemprop="genre"
			class="book-review-block__genre">
			<?php echo wp_kses_post( $genre ); ?>
		</span>
		<?php endif; ?>

		<!-- Publisher -->
		<?php if ( ! empty( $publisher ) ): ?>
		<span itemscope itemtype="https://schema.org/Organization" itemprop="publisher">
			<span itemprop="name"
				class="book-review-block__publisher">
				<?php echo wp_kses_post( $publisher ); ?>
			</span>
		</span>
		<?php endif; ?>

		<!-- Release Date -->
		<?php if ( ! empty( $release_date ) ): ?>
		<span itemprop="datePublished"
			class="book-review-block__release-date">
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
		<span itemprop="numberOfPages"
			class="book-review-block__pages">
			<?php echo wp_kses_post( $pages ); ?>
		</span>
		<?php endif; ?>

		<!-- Source -->
		<?php if ( ! empty( $source ) ): ?>
		<span class="book-review-block__source">
			<?php echo wp_kses_post( $source ); ?>
		</span>
		<?php endif; ?>

		<div itemscope itemtype="https://schema.org/Review" itemprop="review">

			<span itemscope itemtype="https://schema.org/Person" itemprop="author">
				<meta itemprop="name"
					content="<?php echo esc_attr( get_the_author() ); ?>">
			</span>

			<!-- Rating -->
			<?php if ( ! empty( $rating_html ) ): ?>
				<div itemscope itemtype="http://schema.org/Rating" itemprop="reviewRating"
					class="book-review-block__rating book-review-block__review-rating">
					<meta itemprop="ratingValue"
						content="<?php echo esc_attr( $this->get_post_meta( 'book_review_rating' ) ); ?>">

					<div className="book-review-block__rating-buttons">
						<?php
							echo wp_kses(
								implode( $rating_html ),
								array_merge(
									wp_kses_allowed_html( 'post' ),
									array(
										'svg'   => array(
											'height'  => array(),
											'viewbox' => array(),
											'width'   => array(),
											'xmlns'   => array(),
										),
										'path'  => array(
											'class'  => array(),
											'd'      => array(),
											'fill'   => array(),
											'stroke' => array(),
										),
									)
								)
							);
						?>
					</div>
				</div>
			<?php endif; ?>

		</div>

		<!-- Summary / Synopsis -->
		<?php if ( ! empty( $summary ) ): ?>
		<div class="book-review-block__description">
			<?php echo wpautop( wp_kses_post( $summary ) ); ?>
		</div>
		<?php endif; ?>
	</div>
</div>
