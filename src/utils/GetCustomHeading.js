export function getCustomHeading(pathname) {
  const decodedPathname = decodeURIComponent(pathname);
  const splittedPath = decodedPathname.split("/");
  const pathElements = splittedPath.splice(0, 1);
  const CapitalizedElements = splittedPath.map(capitalizeFirstLetter);
  const customHeading = CapitalizedElements.join(" > ");
  return customHeading;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
