<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Book_Review_Block_Settings {
	/**
	 * Option key to save settings
	 *
	 * @var string
	 */
	protected static $advanced_key = 'book_review_advanced';

	/**
	 * Default settings
	 *
	 * @var array
	 */
	protected static $defaults = array(
		'book_review_api_key' => ''
	);

	/**
	 * Get saved settings
	 *
	 * @return array
	 */
	public static function get_settings() {
		$advanced = get_option( self::$advanced_key, array() );

		if ( ! is_array( $advanced ) || empty( $advanced ) ) {
			return self::$defaults;
		}

		return wp_parse_args( $advanced, self::$defaults );
	}

	/**
	 * Save settings
	 *
	 * Array keys must be whitelisted (IE must be keys of self::$defaults
	 *
	 * @param array $settings
	 */
	public static function save_settings( array $settings ) {
		// Remove any non-allowed indexes before saving.
		foreach ( $settings as $key => $setting ) {
			if ( ! array_key_exists( $key, self::$defaults ) ) {
				unset( $settings[ $key ] );
			}
		}

		update_option( self::$advanced_key, $settings );
	}
}
