import http from "k6/http";
import { check } from "k6";
import encoding from "k6/encoding";
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export const options = {
  //vus: 1,
  //iterations: 1,
  //duration: '1m',

  thresholds: {
    http_req_failed: ["rate<=0.01"],
    http_req_duration: ["p(95)<=300"]
  },

  stages: [
    { duration: "10s", target: 5 },
    //{ duration: "10s", target: 10 },
    //{ duration: "20s", target: 25 },
    //{ duration: "15s", target: 25 },
    //{ duration: "10s", target: 0 },
  ],
}

let response;
const username = "user";
const password = "passwd"; 

export default function() {

  //const credentials = `${username}:${password}`;
  const credentials = username + ":" + password;
  //const URL = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;
  const URL = "https://" + credentials + "@httpbin.test.k6.io/basic-auth/" + username + "/" + password;

  //response = http.get(URL);
  //console.log("Response code for basic auth " + response.status);

  const encodedCredentials = encoding.b64encode(credentials);
  //console.log(encodedCredentials);

  const options = {
    headers: {
      //Authorization: "Basic " + encodedCredentials,
      Authorization: `Basic ${encodedCredentials}`
    }
  };

  response = http.get(URL, options);

  check(response, {
    'is status 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username
  });
}

export function handleSummary(data) {
  return {
    "stdout": textSummary(data, { indent: ' ', enableColors: true }),
    "summary_junit.xml": jUnit(data), 
    "summary_json.json": JSON.stringify(data),
    "summary.html": htmlReport(data)
  }
}