import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { videoUrl, title, description } = req.body;

    try {
      const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });
      
      const response = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: {
          snippet: {
            title,
            description,
            categoryId: '22' // People & Blogs category
          },
          status: {
            privacyStatus: 'private' // or 'public' if you're ready to publish directly
          }
        },
        media: {
          body: videoUrl
        }
      });

      res.status(200).json({ videoId: response.data.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload video" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
