// Nigeria is UTC+1, we'll convert from US time zones
export function convertToNigeriaTime(timestamp: number): number {
  const date = new Date(timestamp);
  
  // Get the time difference between local time and UTC
  const localOffset = date.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
  
  // Add local offset to get UTC time
  const utcTime = timestamp + localOffset;
  
  // Add Nigeria offset (UTC+1 = -1 hour = -3600000 milliseconds)
  const nigeriaOffset = 1 * 60 * 60 * 1000;
  
  return utcTime + nigeriaOffset;
}