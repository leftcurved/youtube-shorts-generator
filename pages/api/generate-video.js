import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const { content } = req.body;

    try {
      const output = await replicate.run(
        "your-video-generation-model:version",
        { input: { text: content } }
      );
      
      res.status(200).json({ videoUrl: output });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate video" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
