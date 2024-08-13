"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface FileDisplayProps {
  fileName: string;
}

const FileDisplay = ({ fileId }: { fileId: string }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const fetchFile = async () => {
    try {
      // Check if the file is already cached in localStorage
      const cachedData = localStorage.getItem(`file_${fileId}`);
      if (cachedData) {
        const { data, contentType } = JSON.parse(cachedData);
        const url = createBlobUrl(data, contentType);
        setFileUrl(url);
        setFileType(contentType);
        return;
      }

      const response = await axios.get(
        `https://uramsys.onrender.com/files/s/${fileId}`
      );

      const { data, contentType } = response.data;

      // Check if the fetched data is valid (not empty)
      if (data && contentType) {
        setFileType(contentType);

        // Cache the raw data in localStorage
        localStorage.setItem(
          `file_${fileId}`,
          JSON.stringify({ data, contentType })
        );

        const url = createBlobUrl(data, contentType);
        setFileUrl(url);
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const createBlobUrl = (base64Data: string, contentType: string): string => {
    const binary = atob(base64Data);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: contentType });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    fetchFile();

    // Cleanup the created fileUrl
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileId]);

  // Function to delete the cached file when the task is deleted
  // const deleteCache = () => {
  //   localStorage.removeItem(`file_${fileId}`);
  //   setFileUrl(null);
  //   setFileType(null);
  // };

  if (!fileUrl) return <p>No attachment yet</p>;

  if (fileType?.startsWith("image/")) {
    return (
      <div>
        <a
          href={fileUrl}
          download={fileId}
          className="max-w-[300px] md:max-w-[600px] max-h-[300px] md-max-h-[600px] "
        >
          <img
            src={fileUrl}
            alt={fileId}
            loading="lazy"
            className="max-w-[300px] md-max-w-[600px] max-h-[300px] md-max-h-[600px] "
          />
        </a>
      </div>
    );
  }

  if (fileType?.startsWith("video/")) {
    return (
      <div>
        <video
          controls
          src={fileUrl}
          className="max-w-[300px] md-max-w-[600px] max-h-[300px] md-max-h-[400px] "
        />
      </div>
    );
  }

  if (fileType?.startsWith("audio/")) {
    return (
      <div>
        <audio controls src={fileUrl} />
      </div>
    );
  }

  if (fileType === "application/pdf") {
    return (
      <div>
        <iframe
          src={fileUrl}
          width="600"
          height="800"
          allowFullScreen
          className="max-w-[300px] md-max-w-[600px] max-h-[300px] md-max-h-[400px] "
        />
      </div>
    );
  }

  return (
    <div>
      <a href={fileUrl} download={fileId}>
        Click to Download: {fileId}
      </a>
    </div>
  );
};

export default FileDisplay;
