module.exports = {
	prettier: false,
	svgo: true,
	svgoConfig: {
		plugins: [{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		}],
	},
	titleProp: true,
}