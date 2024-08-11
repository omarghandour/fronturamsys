"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface FileDisplayProps {
  fileName: string;
}
// const fileName = "669e394ab318860603d9bb7e";
const FileDisplay = ({ fileId }: { fileId: string }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const fetchFile = async () => {
    try {
      const response = await axios.get(
        `https://uramsys.onrender.com/files/s/${fileId}`
      );

      const { data, contentType } = response.data;
      setFileType(contentType);

      // Decode Base64 string and create a Blob URL
      const binary = atob(data);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: contentType });
      const url = URL.createObjectURL(blob);

      setFileUrl(url);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
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

  if (!fileUrl) return <p>Loading...</p>;

  if (fileType?.startsWith("image/")) {
    return (
      <img
        src={fileUrl}
        alt={fileId}
        loading="lazy"
        className="max-w-[300px] md:max-w-[600px] max-h-[300px] md:max-h-[600px] "
      />
    );
  }

  if (fileType?.startsWith("video/")) {
    return (
      <video
        controls
        src={fileUrl}
        className="max-w-[300px] md:max-w-[600px] max-h-[300px] md:max-h-[400px] "
      />
    );
  }

  if (fileType?.startsWith("audio/")) {
    return <audio controls src={fileUrl} />;
  }

  if (fileType === "application/pdf") {
    return <iframe src={fileUrl} width="600" height="800" />;
  }

  return (
    <a href={fileUrl} download={fileId}>
      Click to Download: {fileId}
    </a>
  );
};

export default FileDisplay;
