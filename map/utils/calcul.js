export const inRadius = (coordinates, position, radius) => {
  return getDistance(position, coordinates) < radius;
};

export const getDistance = (origin, destination) => {
  let lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0]);

  let deltaLat = lat2 - lat1;
  let deltaLon = lon2 - lon1;

  let a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
};

const toRadian = degree => {
  return (degree * Math.PI) / 180;
};
