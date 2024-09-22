import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { videoUrl, title, description } = req.body;

  if (!videoUrl || !title) {
    res.status(400).json({ error: "videoUrl and title are required" });
    return;
  }

  try {
    const youtube = google.youtube({ 
      version: 'v3', 
      auth: process.env.YOUTUBE_API_KEY 
    });
    
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description: description || '',
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
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
}
