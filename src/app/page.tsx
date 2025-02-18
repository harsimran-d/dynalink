"use client";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    if (!url) {
      setError("URL is required");
      return;
    }
    if (!url.startsWith("http")) {
      setError("URL must start with http or https");
      return;
    }
    if (url.length > 2048) {
      setError("URL must be less than 2048 characters");
      return;
    }
    if (shortUrl) {
      setShortUrl("");
      setUrl("");
      return;
    }
    setError("");
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }
      const data = await res.json();

      if (data.shortId) {
        const fullUrl = `${window.location.origin}/${data.shortId}`;
        setShortUrl(fullUrl);
      } else {
        setError("An error occurred");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    }
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
      {error && <p className="text-red-500">{error}</p>}
      <br />
      <button
        onClick={shortenUrl}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Shorten
      </button>
      {shortUrl && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg">
            Short URL:{" "}
            <a href={shortUrl} target="_blank" className="text-blue-500">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
            }}
            className="h-full rounded text-blue-500"
          >
            <CopyIcon size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
