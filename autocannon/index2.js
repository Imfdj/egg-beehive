'use strict';
const autocannon = require('autocannon');
autocannon(
  {
    url: 'http://localhost:7002/api/upload',
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7ImlkIjoxLCJyb2xlSWRzIjpbMSwyLDI2LDE3LDE4LDE5LDIwLDI0LDIyXX19LCJleHAiOjE2MDAxNzAwODksImlhdCI6MTYwMDA4MzY4OX0.RPPpnfPqI0yqD8Es7tS4DHe-HrOiD6kGtM7RvE0UTTs',
    }, // default
    connections: 1, // default
    pipelining: 1, // default
    duration: 350, // default
    form: {
      field: {
        type: 'file',
        path: 'C://Users/Administrator/Desktop/2020-09-15_171643.jpg',
        options: {
          filepath: 'C://Users/Administrator/Desktop/2020-09-15_171643.jpg',
        },
      },
    }, // default
  },
  console.log
);
