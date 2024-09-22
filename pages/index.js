import { useState } from 'react';

export default function Home() {
  const [newsContent, setNewsContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerateContent = async () => {
    const res = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newsContent })
    });
    const data = await res.json();
    setGeneratedContent(data.generatedContent);
  };

  const handleGenerateVideo = async () => {
    const res = await fetch('/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: generatedContent })
    });
    const data = await res.json();
    setVideoUrl(data.videoUrl);
  };

  const handleUploadVideo = async () => {
    const res = await fetch('/api/upload-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        videoUrl,
        title: "Your Video Title",
        description: "Your Video Description"
      })
    });
    const data = await res.json();
    alert(`Video uploaded with ID: ${data.videoId}`);
  };

  return (
    <div>
      <textarea 
        value={newsContent} 
        onChange={(e) => setNewsContent(e.target.value)}
        placeholder="Enter crypto news here"
      />
      <button onClick={handleGenerateContent}>Generate Content</button>
      
      {generatedContent && (
        <>
          <textarea 
            value={generatedContent} 
            onChange={(e) => setGeneratedContent(e.target.value)}
          />
          <button onClick={handleGenerateVideo}>Generate Video</button>
        </>
      )}
      
      {videoUrl && (
        <>
          <video src={videoUrl} controls />
          <button onClick={handleUploadVideo}>Upload to YouTube</button>
        </>
      )}
    </div>
  );
}
