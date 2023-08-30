export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
}

export const formatDistance = (distanceInMeters) => {
  const kilometers = Math.floor(distanceInMeters / 1000);
  const meters = distanceInMeters % 1000;

  if (kilometers > 0 && meters > 0) {
    return `${kilometers}km ${meters}m`;
  } else if (kilometers > 0) {
    return `${kilometers}km`;
  } else {
    return `${meters}m`;
  }
}