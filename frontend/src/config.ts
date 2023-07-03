export default {
  serverUrl:
    process.env.NODE_ENV === "production"
      ? "https://wojup5pnob.execute-api.us-east-1.amazonaws.com"
      : "http://localhost:3000",
};
