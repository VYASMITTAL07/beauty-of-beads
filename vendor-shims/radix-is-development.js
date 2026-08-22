// Shim for @radix-ui/primitive's "./is-development" export condition.
// Parcel 2.16.4's resolver does not support the nested development/production
// custom export conditions used by @radix-ui/primitive@1.1.7's package.json
// exports map, so we alias that subpath directly to a production-mode shim
// (see package.json "alias" field). This always resolves IS_DEVELOPMENT to
// false, matching what a real production build of the upstream package
// would provide.
export const IS_DEVELOPMENT = false;
