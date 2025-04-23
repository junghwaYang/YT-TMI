export function extractVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get('v');
    return videoId;
  } catch (e) {
    return null;
  }
}
