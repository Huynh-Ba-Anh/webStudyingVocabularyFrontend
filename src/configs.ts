const config = {
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  apiVersion: "v1",
};

console.log("🔗 Base URL:", config.baseUrl);
console.log("🔗 API Version:", config.apiVersion);

export default config;
