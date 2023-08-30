export const validateLongitude = (string) => {
  const longitudePattern = /^-?(180(?:\.0{1,4})?|(1[0-7]\d|0?\d{1,2})(?:\.\d{1,4})?)$/;

  return !!string.match(longitudePattern);
}

export const validateLatitude = (string) => {
  const latitudePattern = /^-?(90(?:\.0{1,4})?|[0-8]?\d(?:\.\d{1,4})?)$/;

  return !!string.match(latitudePattern);
}