const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin({
		    host: 'localhost',
		    port: 3000,
		    proxy: 'http://localhost:8080/',
		    files: [{
		        match: [
		            '**/*.php'
		        ],
		        fn: function(event, file) {
		            if (event === 'change') {
		                const bs = require('browser-sync').get('bs-webpack-plugin');
		                bs.reload();
		            }
		        }
		    }]
		}, {
		    reload: false
		})
	],
	devServer: {
		hot: true,
        proxy: {
            '/': {
                target: {
                    host: "wpwp.local",
                    protocol: "http:"
                },
                changeOrigin: true,
                secure: false
            }
        }
	}
});