export default function searchInfoQuerySanitizer(propSlug) {
  let searchInfo = propSlug;
  if (!searchInfo) return;
  let validatedSearchInfo =
    searchInfo.charAt(0).toUpperCase() + searchInfo.substring(1).toLowerCase();
  return {
    validatedSearchInfo,
  };
}
