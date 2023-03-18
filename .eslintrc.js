module.exports = {
	"extends": [ "plugin:@wordpress/eslint-plugin/recommended" ],
	"rules": {
		"@wordpress/i18n-text-domain": [
			"error",
			{
				"allowedTextDomain": "book-review-block"
			}
		]
	}
};
