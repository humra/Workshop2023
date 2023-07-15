import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
  duration: "1m",

  thresholds: {
    http_req_failed: ["rate<=0.01"],
    http_req_duration: ["p(95)<300"]
  }
}

let response;
const username = 'user';
const password = 'passwd';

export default function() {

  const credentials = `${username}:${password}`;
  const url = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;

  response = http.get(url);
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}