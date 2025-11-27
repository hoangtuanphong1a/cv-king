// Simple API connectivity test script
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require("axios");

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

async function testAPIConnection() {
  console.log("🚀 Testing API Connection...");
  console.log(`📍 API Base URL: ${API_BASE_URL}`);

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    // Test basic connectivity
    console.log("\n📡 Testing basic connectivity...");
    const healthResponse = await instance.get("/");
    console.log("✅ Basic connectivity: OK");
    console.log("📄 Response:", healthResponse.data);

    // Test auth endpoint (should return 401 without token)
    console.log("\n🔐 Testing auth endpoint...");
    try {
      await instance.get("/auth/profile");
      console.log("⚠️  Auth endpoint should require authentication");
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("✅ Auth endpoint properly protected");
      } else {
        console.log("❌ Unexpected auth error:", error.response?.status);
      }
    }

    // Test jobs endpoint
    console.log("\n💼 Testing jobs endpoint...");
    try {
      const jobsResponse = await instance.get("/jobs");
      console.log("✅ Jobs endpoint accessible");
      console.log(`📊 Found ${jobsResponse.data?.data?.length || 0} jobs`);
    } catch (error) {
      console.log(
        "❌ Jobs endpoint error:",
        error.response?.status,
        error.response?.data?.message
      );
    }

    // Test blog-posts endpoint
    console.log("\n📝 Testing blog-posts endpoint...");
    try {
      const blogsResponse = await instance.get("/blog-posts");
      console.log("✅ Blog-posts endpoint accessible");
      console.log(
        `📊 Found ${blogsResponse.data?.data?.length || 0} blog posts`
      );
    } catch (error) {
      console.log(
        "❌ Blog-posts endpoint error:",
        error.response?.status,
        error.response?.data?.message
      );
    }

    // Test users endpoint (should be protected)
    console.log("\n👥 Testing users endpoint...");
    try {
      await instance.get("/users");
      console.log("⚠️  Users endpoint should be protected");
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("✅ Users endpoint properly protected");
      } else {
        console.log("❌ Unexpected users error:", error.response?.status);
      }
    }

    console.log("\n🎉 API connectivity test completed!");
  } catch (error) {
    console.error("❌ API Connection Failed:");
    console.error("Error:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.error(
        "💡 Make sure the backend server is running on the correct port"
      );
    } else if (error.code === "ENOTFOUND") {
      console.error("💡 Check if the API_BASE_URL is correct");
    }
  }
}

// Run the test
testAPIConnection();
