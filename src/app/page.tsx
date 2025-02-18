"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.shortUrl) setShortUrl(data.shortUrl);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">URL Shortener</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL"
        className="w-96 rounded-md border p-2"
      />
      <button
        onClick={shortenUrl}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Shorten
      </button>
      {shortUrl && (
        <p className="mt-4 text-lg">
          Short URL:{" "}
          <a href={shortUrl} className="text-blue-500">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
