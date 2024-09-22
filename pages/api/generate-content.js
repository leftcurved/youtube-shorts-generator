import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const { newsContent } = req.body;

    try {
      const output = await replicate.run(
        "your-fine-tuned-model:version",
        { input: { prompt: newsContent } }
      );
      
      res.status(200).json({ generatedContent: output });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate content" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}