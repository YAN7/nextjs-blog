const withTM = require("next-transpile-modules")([
	"react-syntax-highlighter/dist/esm/styles/prism/xonokai"
	]); // pass the modules you would like to see transpiled
	
	module.exports = withTM();