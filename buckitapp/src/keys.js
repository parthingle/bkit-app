const env = "BETA";
export default (env === "BETA"
  ? {
      BASE_URL: "https://glacial-thicket-64454.herokuapp.com"
    }
  : {
      BASE_URL: "http://localhost:8080"
    });
