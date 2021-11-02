const _loaderUtils = require("loader-utils");

const _normalizePath = {
  default: require('normalize-path'),
};

const _path = {
  default: require('path'),
};

const _cssesc = {
  default: require("cssesc"),
};

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
const whitespace = '[\\x20\\t\\r\\n\\f]';
const unescapeRegExp = new RegExp(`\\\\([\\da-f]{1,6}${whitespace}?|(${whitespace})|.)`, 'ig');

function unescape(str) {
  return str.replace(unescapeRegExp, (_, escaped, escapedWhitespace) => {
    const high = `0x${escaped}` - 0x10000;
    /* eslint-disable line-comment-position */
    // NaN means non-codepoint
    // Workaround erroneous numeric interpretation of +"0x"
    // eslint-disable-next-line no-self-compare

    return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
    String.fromCharCode(high + 0x10000) : // Supplemental Plane codepoint (surrogate pair)
    // eslint-disable-next-line no-bitwise
    String.fromCharCode(high >> 10 | 0xd800, high & 0x3ff | 0xdc00);
    /* eslint-enable line-comment-position */
  });
} // eslint-disable-next-line no-control-regex

const filenameReservedRegex = /[<>:"/\\|?*\x00-\x1F]/g; // eslint-disable-next-line no-control-regex

const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
const reRelativePath = /^\.+/;

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = (0, _normalizePath.default)(_path.default.relative(options.context || '', loaderContext.resourcePath)); // eslint-disable-next-line no-param-reassign

  options.content = `${options.hashPrefix + request}+${unescape(localName)}`; // Using `[path]` placeholder outputs `/` we need escape their
  // Also directories can contains invalid characters for css we need escape their too

  return (0, _cssesc.default)((0, _loaderUtils.interpolateName)(loaderContext, localIdentName, options) // For `[hash]` placeholder
  .replace(/^((-?[0-9])|--)/, '_$1').replace(filenameReservedRegex, '-').replace(reControlChars, '-').replace(reRelativePath, '-').replace(/\./g, '-'), {
    isIdentifier: true
  }).replace(/\\\[local\\\]/gi, localName);
}

exports.getLocalIdent = getLocalIdent

module.exports = getLocalIdent;
