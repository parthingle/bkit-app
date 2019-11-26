const env = "DEV";
export default env === "BETA"
  ? {
      BASE_URL:
        "https://us-central1-buckit-staging-f3d31.cloudfunctions.net/api"
    }
  : {
      BASE_URL: "http://localhost:8080"
    };
