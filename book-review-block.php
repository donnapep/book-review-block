<?php
/**
 * Plugin Name: Book Review Block
 * Plugin URI: https://github.com/donnapep/book-review-block
 * Description: A Gutenberg block to add book details and a star rating to a book review post.
 * Author: Donna Peplinskie
 * Author URI: https://donnapeplinskie.com
 * Version: 2.2.1
 * Text Domain: book-review-block
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Requires at least: 6.0
 * Tested up to: 6.6
 * Requires PHP: 7.4
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Book_Review_Block {
	/**
	 * Instance of this class.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      object   $instance   A single instance of this class.
	 */
	private static $instance;

	/**
	 * The slug of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $slug    The plugin slug.
	 */
	private $slug;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Controller to communicate with the REST API.
	 *
	 * @since    2.2.1
	 * @access   private
	 * @var      string    $controller    Property to access the REST API.
	 */
	private $controller;

	/**
	 * Registers the plugin.
	 *
	 * @since     1.0.0
	 * @access    public
	 * @return    object    A single instance of this class.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Book_Review_Block();
		}
	}

	/**
	 * Defines the core functionality of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function __construct() {
		$this->version = '2.2.1';
		$this->slug    = 'book-review-block';

		require_once plugin_dir_path( __FILE__ ) . 'includes/book-review-block-settings-controller.php';
		$this->controller = new Book_Review_Block_REST_Controller();
		$this->controller->init();

		add_action( 'init', array( $this, 'init_block' ) );
	}

	/**
	 * Initializes the block.
	 *
	 * @since  1.1.2
	 * @access public
	 */
	public function init_block() {
		// Automatically load dependencies and version.
		$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

		wp_register_script(
			$this->slug,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version']
		);

		wp_set_script_translations( $this->slug, 'book-review-block' );

		wp_register_style(
			$this->slug . '-editor',
			plugins_url( 'build/index.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			$asset_file['version']
		);

		wp_register_style(
			$this->slug,
			plugins_url( 'build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version']
		);

		// Register block.
		register_block_type( 'book-review-block/book-review', array(
			'editor_script' => $this->slug,
			'editor_style'  => $this->slug . '-editor',
			'style' => $this->slug,
			'render_callback' => array( $this, 'render_book_review' ),
		) );

		$this->register_meta_field( 'book_review_cover_url' );
		$this->register_meta_field( 'book_review_title' );
		$this->register_meta_field( 'book_review_series' );
		$this->register_meta_field( 'book_review_author' );
		$this->register_meta_field( 'book_review_genre' );
		$this->register_meta_field( 'book_review_isbn' );
		$this->register_meta_field( 'book_review_publisher' );
		$this->register_meta_field( 'book_review_release_date' );
		$this->register_meta_field( 'book_review_format' );
		$this->register_meta_field( 'book_review_pages' );
		$this->register_meta_field( 'book_review_source' );
		$this->register_meta_field( 'book_review_rating' );
		$this->register_meta_field( 'book_review_summary' );
	}

	/**
	 * Renders the block where the markup is stored in post content (i.e. deprecated v1 and current version).
	 *
	 * @since  1.1.2
	 * @param  array  $attributes Block attributes.
	 * @param  string $content    Block inner content.
	 * @return string Markup.
	 * @access public
	 */
	public function render_book_review( $attributes, $content ) {
		if ( ! empty( $content ) ) {
			$img_element = '<img ';
			$img_position = strpos( $content, $img_element );

			// Add schema.org markup to first image element.
			if ( $img_position ) {
				$content = substr_replace(
					$content,
					'itemprop="image" ',
					$img_position + strlen( $img_element ),
					0
				);
			}

			$review_rating_element = '<div itemscope itemtype="https://schema.org/Rating" itemprop="reviewRating"';
			$review_rating_element_position = strpos( $content, $review_rating_element );

			// Add schema.org markup for the author of the review.
			if ( $review_rating_element_position ) {
				$content = substr_replace(
					$content,
					'<span itemscope itemtype="https://schema.org/Person" itemprop="author">' .
						'<meta itemprop="name" content="' . esc_attr( get_the_author() ) . '"/>' .
					'</span>',
					$review_rating_element_position,
					0
				);
			}

			return $content;
		}

		if ( in_the_loop() ) {
			return $this->render_book_review_deprecated_v2( $attributes, $content );
		}
	}

	/**
	 * Renders the block where the markup is stored in post meta (deprecrated v2).
	 *
	 * @since  1.1.2
	 * @param  array  $attributes Block attributes.
	 * @param  string $content    Block inner content.
	 * @return string Markup.
	 * @access public
	 */
	private function render_book_review_deprecated_v2( $attributes, $content ) {
		$title = $this->get_post_meta( 'book_review_title' );
		$cover_url = $this->get_post_meta( 'book_review_cover_url' );
		$series = $this->get_post_meta( 'book_review_series' );
		$author = $this->get_post_meta( 'book_review_author' );
		$genre = $this->get_post_meta( 'book_review_genre' );
		$publisher = $this->get_post_meta( 'book_review_publisher' );
		$release_date = $this->get_post_meta( 'book_review_release_date' );
		$format = $this->get_post_meta( 'book_review_format' );
		$pages = $this->get_post_meta( 'book_review_pages' );
		$source = $this->get_post_meta( 'book_review_source' );
		$summary = $this->get_post_meta( 'book_review_summary' );
		$rating_html = array_map( array( $this, 'get_rating_html' ), array( 1, 2, 3, 4, 5 ) );

		if ( isset( $attributes ) && isset( $attributes['backgroundColor'] ) ) {
			$background_color = $attributes['backgroundColor'];
		} else {
			$background_color = '';
		}

		ob_start();
		include( 'src/blocks/deprecated/book-review.php' );
		return ob_get_clean();
	}

	/**
	 * Registers a meta field.
	 *
	 * @since  1.1.2
	 * @param  string $meta_key   Meta field key.
	 * @param  bool   $is_integer true if the value of the meta field is an integer, false otherwise.
	 * @access private
	 */
	private function register_meta_field( $meta_key ) {
		register_post_meta( 'post', $meta_key, array(
			'show_in_rest' => true,
			'single' => true,
		) );
	}

	/**
	 * Retrieves post meta field.
	 *
	 * @since  1.1.2
	 * @param  string $meta_key Meta field key.
	 * @access private
	 */
	private function get_post_meta( $meta_key ) {
		return apply_filters(
			$meta_key,
			get_post_meta( get_the_ID(), $meta_key, true ),
			get_the_ID()
		);
	}

	/**
	 * Gets the HTML for the rating.
	 *
	 * @since  1.1.2
	 * @param  integer $rating Rating to compare to.
	 * @access private
	 */
	private function get_rating_html( $rating ) {
		$current_rating = floatval( $this->get_post_meta( 'book_review_rating' ) );
		$classname_whole = ( $current_rating >= ( $rating - 0.5 ) ) ? '' : 'is-rating-unfilled';
		$classname_half  = ( $current_rating >= $rating ) ? '' : 'is-rating-unfilled';

		$html = "<span class='book-review-block__rating-button' role='button'>" .
			"<span>" .
				"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>" .
					"<path class='{$classname_whole}' fill='#eba845' stroke='#eba845' d='M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z' />" .
				"</svg>" .
			"</span>" .
			"<span>" .
				"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>" .
					"<path class='{$classname_half}' fill='#eba845' stroke='#eba845' d='M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z' />" .
				"</svg>" .
			"</span>" .
		"</span>";

		return $html;
	}
}

Book_Review_Block::register();
