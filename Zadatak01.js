import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 3
}

export default function() {
  http.get("https://test.k6.io");
}