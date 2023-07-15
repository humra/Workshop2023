import http from "k6/http";

export const options = {
  vus: 10,
  iterations: 10,
  duration: "1m",

  thresholds: {
    http_req_failed: ["rate<=0.01"],
    http_req_duration: ["p(95)<300"]
  }
}

let response;

export default function() {
  response = http.get("https://test.k6.io");
  console.log(response.status);
}