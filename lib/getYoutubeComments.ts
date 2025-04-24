import axios from 'axios';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/commentThreads';
const YOUTUBE_API_MAX_RESULTS = 100;
const YOUTUBE_API_PART = 'snippet';

interface YoutubeComment {
  snippet: {
    topLevelComment: {
      id: string;
      snippet: {
        textDisplay: string;
      };
    };
  };
}

export async function getYoutubeComments(videoId: string): Promise<string[]> {
  const { data } = await axios.get(YOUTUBE_API_URL, {
    params: {
      part: YOUTUBE_API_PART,
      videoId,
      maxResults: YOUTUBE_API_MAX_RESULTS,
      key: YOUTUBE_API_KEY,
    },
  });

  return data.items.map((item: YoutubeComment) => item.snippet.topLevelComment.snippet.textDisplay);
}
