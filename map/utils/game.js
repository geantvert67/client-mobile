/**
 * Fonction formatArea :
 * Formate la zone de jeu
 *
 * @param area Zone à formatter
 */
export const formatArea = (area) => {
  const zone = [];
  area.coordinates[0].map((point) => {
    zone.push({latitude: point[0], longitude: point[1]});
  });

  return zone;
};

/**
 * Fonction formatZone :
 * Formate la zone de jeu
 *
 * @param area Zone à formatter
 */
export const formatZone = (areas) => {
  const zone = [];
  areas.map((area) => {
    !area.forbidden &&
      area.coordinates[0].map((point) => {
        zone.push({latitude: point[0], longitude: point[1]});
      });
  });
  return zone;
};

/**
 * Fonction formatForbiddenZone :
 * Formate les zones interdites
 *
 * @param areas Zones à formatter
 */
export const formatForbiddenZone = (areas) => {
  const zones = [];
  let zone;
  areas.map((area) => {
    area.forbidden &&
      (zone = []) &&
      area.coordinates[0].map((point) => {
        zone.push({latitude: point[0], longitude: point[1]});
      }) &&
      zones.push(zone);
  });
  return zones;
};

export const formatGames = (g) => {
  const games = [];
  g.map((myGame) => games.push(myGame.Game));
  return games;
};
