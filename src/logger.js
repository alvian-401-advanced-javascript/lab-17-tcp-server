'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {});

client.on('file-save', function(data) {
  let payload = JSON.parse(data);
  console.log('did the thing', payload);
});

client.on('file-error', function(data) {
  let payload = JSON.parse(data);
  console.log('did not do the thing', payload);
});

client.on('close', function() {
  console.log('Connection closed');
});

