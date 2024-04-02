module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-recess-order',
  ],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'function-no-unknown': null,
    'color-hex-length': 'long',
    // disabled due to styled-components will have upper case variable
    'value-keyword-case': null,
    'max-nesting-depth': 2,
    'selector-class-pattern': null,
    // disabled due to conflict with stylelint-config-recess-order
    'order/properties-alphabetical-order': null, // stylelint-config-sass-guidelines rule
  },
}