const Remark = require('remark');
const dedent = require('dedent');

const remarkAbbrPlugin = require('../index');

describe('remark abbr plugin', () => {
  it('renders abbr nodes properly', () => {
    const markdownText = dedent`
      This plugin works on MDAST, a Markdown AST
      implemented by [remark](https://github.com/wooorm/remark)

      *[MDAST]: Markdown Abstract Syntax Tree.
      *[AST]: Abstract syntax tree
    `;

    const markdownAST = remarkAbbrPlugin
      .setParserPlugins()
      .reduce(
        (remark, [plugin, pluginOptions]) => remark.use(plugin, pluginOptions),
        new Remark()
      )
      .parse(markdownText);

    remarkAbbrPlugin({ markdownAST });

    expect(markdownAST).toMatchSnapshot();
  });

  it('renders abbr nodes properly with options', () => {
    const markdownText = dedent`
      The HTML specification is maintained by the W3C.

      The HTML specification
      is maintained by the W3C.

      *[HTML]: Hyper Text Markup Language
      *[W3C]: World Wide Web Consortium
    `;

    const markdownAST = remarkAbbrPlugin
      .setParserPlugins({ expandFirst: true })
      .reduce(
        (remark, [plugin, pluginOptions]) => remark.use(plugin, pluginOptions),
        new Remark()
      )
      .parse(markdownText);

    remarkAbbrPlugin({ markdownAST });

    expect(markdownAST).toMatchSnapshot();
  });
});
