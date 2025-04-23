import axios from 'axios';

export async function postSentiment({ comments }: { comments: string[] }) {
  const res = await axios.post('/api/analyze', {
    comments,
  });

  return res.data;
}
