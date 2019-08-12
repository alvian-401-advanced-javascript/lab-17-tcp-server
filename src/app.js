'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {
  console.log('client connected');
  alterFile(process.argv.slice(2).shift());
});

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const events = require('./events.js');

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from( buffer.toString().trim().toUpperCase() )

const alterFile = (file) => {
  return loadFile(file)
  .then( buffer => { 
    console.log(buffer.toString()); //this is logging undefined in all caps
    return convertBuffer(buffer) }) 
  .then( buffer => saveFile(file, buffer) )
  .then( success => events.emit('file-save', {status:1, file: file, text: 'Saved properly'}))
  .catch( error => events.emit('file-error', {status:0, file: file, text: error.message}))
}

module.exports = {loadFile, saveFile, convertBuffer, alterFile};