const visit = require('unist-util-visit');
const remarkAbbr = require('remark-abbr');

const escapeRegExp = str => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

function find(abbrs) {
  return function one(node, index, parent) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type !== 'abbr') continue;
      // Store abbr node for later use
      abbrs[child.abbr] = child;
      node.children.splice(i, 1);
      i -= 1;
    }
    // Remove paragraph if there is no child
    if (node.children.length === 0) parent.children.splice(index, 1);
  };
}

function replace(abbrs) {
  const pattern = Object.keys(abbrs)
    .map(escapeRegExp)
    .join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`);

  return node => {
    if (Object.keys(abbrs).length === 0) return;
    if (!node.children) return;

    // If a text node is present in child nodes, check if an abbreviation is present
    for (let c = 0; c < node.children.length; c++) {
      const child = node.children[c];
      if (node.type === 'abbr' || child.type !== 'text') continue;
      if (!regex.test(child.value)) continue;

      // Transform node
      const newTexts = child.value.split(regex);

      // Remove old text node
      node.children.splice(c, 1);

      // Replace abbreviations
      for (let i = 0; i < newTexts.length; i++) {
        const content = newTexts[i];
        if (abbrs.hasOwnProperty(content)) {
          node.children.splice(c + i, 0, abbrs[content]);
        } else {
          node.children.splice(c + i, 0, {
            type: 'text',
            value: content,
          });
        }
      }
    }
  };
}

module.exports = ({ markdownAST }) => {
  const abbrs = {};
  visit(markdownAST, 'paragraph', find(abbrs));
  visit(markdownAST, replace(abbrs));

  return markdownAST;
};

module.exports.setParserPlugins = () => [remarkAbbr];
