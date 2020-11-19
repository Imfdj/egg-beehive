'use strict';
const autocannon = require('autocannon');
autocannon(
  {
    url: 'http://39.105.27.90:7009/all',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7ImlkIjoxLCJyb2xlSWRzIjpbMSwyLDI2LDE4LDE5LDIwLDI0LDIyXX19LCJleHAiOjE2MDAzMzU4NzEsImlhdCI6MTYwMDI0OTQ3MX0.erlp7z2EvA7Ofvzb897b2hnGtym_m1EPnIKVoZpSwws',
    }, // default
    connections: 20, // default
    pipelining: 1, // default
    duration: 5, // default
  },
  console.log
);
