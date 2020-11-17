'use strict';
const autocannon = require('autocannon');
autocannon({
  url: 'http://localhost:7002/api/v1/roles/list?name=&offset=0&prop_order=id&order=desc',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7ImlkIjoxLCJyb2xlSWRzIjpbMSwyLDI2LDE3LDE4LDE5LDIwLDI0LDIyXX19LCJleHAiOjE2MDAxNzAwODksImlhdCI6MTYwMDA4MzY4OX0.RPPpnfPqI0yqD8Es7tS4DHe-HrOiD6kGtM7RvE0UTTs',
  }, // default
  connections: 200, // default
  pipelining: 1, // default
  duration: 5, // default
}, console.log);
