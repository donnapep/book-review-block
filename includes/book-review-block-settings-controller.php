<?php
/**
 * Book Review Block REST API.
 *
 * @version 1.5.0
 * @package Book_Review_Block/API
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Book_Review_Block_REST_Controller class.
 */
class Book_Review_Block_REST_Controller {
	/**
	 * The namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'book-review-block/v1';

	public function init() {
		add_action( 'rest_api_init', [ $this, 'add_routes'] );
		require_once plugin_dir_path( __FILE__ ) . 'book-review-block-settings.php';
	}

	/**
	 * Add routes
	 */
	public function add_routes() {
		register_rest_route(
			$this->namespace,
			'/settings',
			array(
				'methods'         => WP_REST_Server::CREATABLE,
				'callback'        => array( $this, 'update_settings' ),
				'args' => array(
					'book_review_api_key' => array(
						'type' => 'string',
						'required' => false,
						'sanitize_callback' => 'sanitize_text_field' // sanitize_text?
					),
				),
				'permission_callback' => array( $this, 'permissions' )
			)
		);

		register_rest_route(
			$this->namespace,
			'/settings',
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_settings' ),
				'args'            => array(
				),
				'permission_callback' => array( $this, 'permissions' )
			)
		);
	}

	/**
	 * Check request permissions
	 *
	 * @return bool
	 */
	public function permissions() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Update settings
	 *
	 * @param WP_REST_Request $request
	 */
	public function update_settings( WP_REST_Request $request ) {
		$settings = array(
			'book_review_api_key' => $request->get_param( 'book_review_api_key' )
		);

		Book_Review_Block_Settings::save_settings( $settings );

		return rest_ensure_response( Book_Review_Block_Settings::get_settings())->set_status( 201 );
	}

	/**
	 * Get settings via API
	 *
	 * @param WP_REST_Request $request
	 */
	public function get_settings( WP_REST_Request $request ) {
		return rest_ensure_response( Book_Review_Block_Settings::get_settings());
	}
}
