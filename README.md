# 🎩 gatsby-remark-abbr

Add abbreviation syntax support to Gatsby.

With this plugin, you'll be able to write in your Markdown pages:

```markdown
The HTML specification
is maintained by the W3C.

_[HTML]: Hyper Text Markup Language
_[W3C]: World Wide Web Consortium
```

And it'll be converted to:

```html
<p>
  The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is
  maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
</p>
```

## Installation

1. Add the package to your project:

- With `yarn`:
  ```shell
  yarn add gatsby-remark-abbr
  ```
- With `npm`:
  ```shell
  npm install gatsby-remark-abbr
  ```

2. Add those few lines into your `gatsby-config.js`:

```diff
    module.exports = {
      plugins: [
        {
          resolve: 'gatsby-transformer-remark',
          options: {
+           plugins: [
+             'gatsby-remark-abbr',
+           ],
          },
        },
    };
```

3. Delete `.cache/` and reboot `gatsby`
4. You can now enjoy markdown abbreviation syntax 🎉

## Options

Options can be passed to `remark-abbr`, check out [their full available list](https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-abbr#options) to see what is available:

```diff
    module.exports = {
      plugins: [
        {
          resolve: 'gatsby-transformer-remark',
          options: {
            plugins: [
-             'gatsby-remark-abbr',
+             {
+               resolve: 'gatsby-remark-abbr',
+               options: { expandFirst: true }
+             },
            ],
          },
        },
    };
```

## License

It's a wrapper around [remark-abbr] plugin, which is under MIT license.

[some code]: src/index.js#L4-L57
[remark-abbr]: https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-abbr
