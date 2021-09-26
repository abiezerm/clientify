const withLess = require("next-with-less");

/** @type {import('next').NextConfig} */
module.exports = withLess({
  reactStrictMode: false,
  lessLoaderOptions: {
    /* ... */
  },
});
