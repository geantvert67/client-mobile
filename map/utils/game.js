export const formatZone = areas => {
  const zone = [];
  areas.map(area => {
    !area.forbidden &&
      area.coordinates[0].map(point => {
        zone.push({latitude: point[0], longitude: point[1]});
      });
  });
  return zone;
};

export const formatForbiddenZone = areas => {
  const zones = [];
  let zone;
  areas.map(area => {
    area.forbidden &&
      (zone = []) &&
      area.coordinates[0].map(point => {
        zone.push({latitude: point[0], longitude: point[1]});
      }) &&
      zones.push(zone);
  });
  return zones;
};
