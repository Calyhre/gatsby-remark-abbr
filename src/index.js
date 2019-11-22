const remarkAbbr = require('remark-abbr');

let transformer;

function pluginWrapper(options) {
  transformer = remarkAbbr.call(this, options);
}

module.exports = ({ markdownAST }) => {
  transformer(markdownAST);
};

module.exports.setParserPlugins = options => [[pluginWrapper, options]];
