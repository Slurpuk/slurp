export function calculateDistance(coords, currentCenterLocation) {
  const R = 6371e3; // metres
  const latitude1 = (currentCenterLocation.latitude * Math.PI) / 180; // φ, λ in radians
  const latitude2 = (coords.latitude * Math.PI) / 180;
  const diffLat =
    ((coords.latitude - currentCenterLocation.latitude) * Math.PI) / 180;
  const diffLon =
    ((coords.longitude - currentCenterLocation.longitude) * Math.PI) / 180;

  const aa =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(latitude1) *
    Math.cos(latitude2) *
    Math.sin(diffLon / 2) *
    Math.sin(diffLon / 2);
  const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));

  // in metres
  return parseInt(R * cc);
}

export function processDistance(minutes){
  minutes = Number(minutes);
  var d = Math.floor(minutes / (24*60));
  var h = Math.floor(minutes % (24*60) / 60);
  var m = Math.floor(minutes % 60);

  var dDisplay = d > 0 ? d + ' d' : "";
  var hDisplay = h > 0 ? h + ' h ' : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";

  return dDisplay + hDisplay + mDisplay;
}
