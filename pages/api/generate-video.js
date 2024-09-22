import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  try {
    const output = await replicate.run(
      "your-video-generation-model:version",
      { input: { text: content } }
    );
    
    res.status(200).json({ videoUrl: output });
  } catch (error) {
    console.error("Error generating video:", error);
    res.status(500).json({ error: "Failed to generate video" });
  }
}
