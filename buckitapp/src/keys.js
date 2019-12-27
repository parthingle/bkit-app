const env = "DEV";
export default env === "BETA"
  ? {
      BASE_URL:
        "https://us-central1-buckit-staging-f3d31.cloudfunctions.net/api",
      MAPBOX_ACCESS_TOKEN:
        "pk.eyJ1IjoicGFydGhpbmdsZSIsImEiOiJjazQyN3p0ZTcwOWY2M2RxYzF5dndwaXNlIn0.mA4HSxsCe-GN4Gf5FNbL9Q"
    }
  : {
      BASE_URL: "http://localhost:8080",
      MAPBOX_ACCESS_TOKEN:
        "pk.eyJ1IjoicGFydGhpbmdsZSIsImEiOiJjazQyN3p0ZTcwOWY2M2RxYzF5dndwaXNlIn0.mA4HSxsCe-GN4Gf5FNbL9Q"
    };
