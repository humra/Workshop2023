import http from "k6/http";
import { check } from "k6";
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";


export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "10s", target: 10 },
    { duration: "20s", target: 25 },
    { duration: "15s", target: 25 },
    { duration: "10s", target: 0 },
  ],

  thresholds: {
    http_req_failed: ["rate<=0.01"],
    http_req_duration: ["p(95)<300"]
  }
}

let response;
const url = "https://test.k6.io";

export default function() {

  response = http.get(url);

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  console.log("Preparing the end of test summary...");

  return {
    "stdout": textSummary(data, { indent: ' ', enableColors: true }),
    "summary_junit.xml": jUnit(data), 
    "summary_json.json": JSON.stringify(data), 
    "summary.html": htmlReport(data), 
  };
}