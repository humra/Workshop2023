import http from "k6/http";

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

  //const credentials = `${username}:${password}`;
  //const url = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;
  const credentials = username + ":" + password;
  const url = "https://" + credentials + "@httpbin.test.k6.io/basic-auth/" + username + "/" + password;

  response = http.get(url);
  console.log(response.status);
}