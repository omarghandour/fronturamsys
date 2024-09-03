"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const CheckInCheckOutOnline = ({ userId }: { userId: string }) => {
  const [status, setStatus] = useState<
    "Checked In Online" | "Checked Out Online"
  >("Checked Out Online");
  const [lastActionTime, setLastActionTime] = useState<Date | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load cached status and time from local storage
    const cachedStatus = localStorage.getItem(`checkStatusOnline-${userId}`);
    const cachedTime = localStorage.getItem(`lastActionTimeOnline-${userId}`);

    if (cachedStatus) {
      setStatus(cachedStatus as "Checked In Online" | "Checked Out Online");
    }

    if (cachedTime) {
      setLastActionTime(new Date(cachedTime));
    }
  }, [userId]);

  const handleCheckInOnline = async () => {
    try {
      const response = await axios.post(
        `https://uramsys.onrender.com/check/check-in-online/${userId}`
      );
      if (response.status === 200) {
        setStatus("Checked In Online");
        const currentTime = new Date();
        setLastActionTime(currentTime);
        setMessage(response.data.message);

        // Save to local storage after successful check-in online
        localStorage.setItem(
          `checkStatusOnline-${userId}`,
          "Checked In Online"
        );
        localStorage.setItem(
          `lastActionTimeOnline-${userId}`,
          currentTime.toISOString()
        );
      } else if (response.status === 403) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred while checking in online.");
      console.error(error);
    }
  };

  const handleCheckOutOnline = async () => {
    try {
      const response = await axios.post(
        `https://uramsys.onrender.com/check/check-out-online/${userId}`
      );
      if (response.status === 200) {
        setStatus("Checked Out Online");
        const currentTime = new Date();
        setLastActionTime(currentTime);
        setMessage(response.data.message);

        // Update local storage after successful check-out online
        localStorage.setItem(
          `checkStatusOnline-${userId}`,
          "Checked Out Online"
        );
        localStorage.setItem(
          `lastActionTimeOnline-${userId}`,
          currentTime.toISOString()
        );
      } else if (response.status === 403) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred while checking out online.");
      console.error(error);
    }
  };

  const formatTime = (time: Date | null) => {
    if (!time) return "N/A";
    return time.toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Cairo",
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Online Check-In/Check-Out</h1>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <p className="mb-4">
        Status:{" "}
        <span
          className={`font-bold ${
            status === "Checked In Online" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </span>
      </p>
      <p className="mb-4">
        Last Action Time:{" "}
        <span className="font-semibold">{formatTime(lastActionTime)}</span>
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleCheckInOnline}
          className={`px-4 py-2 rounded-md ${
            status === "Checked In Online"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          disabled={status === "Checked In Online"}
        >
          Check In Online
        </button>
        <button
          onClick={handleCheckOutOnline}
          className={`px-4 py-2 rounded-md ${
            status === "Checked Out Online"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white`}
          disabled={status === "Checked Out Online"}
        >
          Check Out Online
        </button>
      </div>
    </div>
  );
};

export default CheckInCheckOutOnline;
