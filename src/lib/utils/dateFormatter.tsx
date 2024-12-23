import { convertToNigeriaTime } from './timeZoneUtils';

export function formatTimestamp(timestamp: number): string {
  try {
    if (!timestamp) return '';

    // Normalize timestamp to milliseconds if needed
    const normalizedTimestamp = timestamp.toString().length === 10 
      ? timestamp * 1000 
      : timestamp;
    
    // Convert to Nigeria time
    const nigeriaTimestamp = convertToNigeriaTime(normalizedTimestamp);
    const date = new Date(nigeriaTimestamp);
    
    if (isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return '';
  }
}