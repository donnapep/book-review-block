module.exports = {
	...require( '@wordpress/scripts/config/.eslintrc.js' ),
	rules: {
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: 'book-review-block',
			},
		],
		'react-hooks/exhaustive-deps': 'warn',
	},
};
