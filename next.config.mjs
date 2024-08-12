/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public", // Directory for service worker and PWA assets
  register: true, // Auto-register the service worker
  skipWaiting: true, // Activate the new service worker immediately
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
});

export default nextConfig;
