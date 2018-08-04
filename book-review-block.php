<?php
/**
 * Plugin Name: Book Review Block
 * Plugin URI: https://github.com/donnapep/book-review-block
 * Description: A Gutenberg block to add book details and a star rating to a book review post.
 * Author: Donna Peplinskie
 * Author URI: https://donnapeplinskie.com
 * Version: 1.1.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

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
	 * The base URL path (without trailing slash).
	 *
	 * @since    1.0.0
   * @access   private
	 * @var      string    $url    The base URL path of this plugin.
	 */
	private $url;

	/**
   * The version of this plugin.
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $version    The current version of this plugin.
   */
	private $version;

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
   * Define the core functionality of the plugin.
   *
   * @since    1.0.0
   * @access   private
   */
	private function __construct() {
		$this->version = '1.1.0';
		$this->slug    = 'book-review-block';
		$this->url     = untrailingslashit( plugins_url( '/', __FILE__ ) );

		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function plugins_loaded() {
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
	}

	/**
	 * Enqueue block assets for use within Gutenberg, as well as on the front end.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function enqueue_block_assets() {
		// Styles
		wp_enqueue_style(
			$this->slug,
			$this->url . '/build/style.css',
			array( 'wp-blocks' ),
			$this->version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function enqueue_block_editor_assets() {
		// Scripts
		wp_enqueue_script(
			$this->slug,
			$this->url . '/build/index.js',
			array( 'wp-blocks' ),
			$this->version
		);

		// Styles
		wp_enqueue_style(
			$this->slug . '-editor',
			$this->url . '/build/editor.css',
			array( 'wp-edit-blocks' ),
			$this->version
		);
	}
}

Book_Review_Block::register();
