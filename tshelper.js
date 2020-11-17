'use strict';
module.exports = {
  watchDirs: {
    model: {
      directory: 'app/model', // files directory.
      // pattern: '**/*.(ts|js)', // glob pattern, default is **/*.(ts|js). it doesn't need to configure normally.
      // ignore: '', // ignore glob pattern, default to empty.
      generator: 'class', // generator name, eg: class、auto、function、object
      interface: 'IModel', // interface name
      declareTo: 'Context.model', // declare to this interface
      // watch: true, // whether need to watch files
      // caseStyle: 'upper', // caseStyle for loader
      // interfaceHandle: val => `ReturnType<typeof ${val}>`, // interfaceHandle
      // trigger: ['add', 'unlink'], // recreate d.ts when receive these events, all events: ['add', 'unlink', 'change']
    },
    extend: {
      directory: 'app/extend', // files directory.
      // pattern: '**/*.(ts|js)', // glob pattern, default is **/*.(ts|js). it doesn't need to configure normally.
      // ignore: '', // ignore glob pattern, default to empty.
      generator: 'class', // generator name, eg: class、auto、function、object
      // interface: 'IModel', // interface name
      declareTo: 'Context.helper', // declare to this interface
      // watch: true, // whether need to watch files
      // caseStyle: 'upper', // caseStyle for loader
      // interfaceHandle: val => `ReturnType<typeof ${val}>`, // interfaceHandle
      // trigger: ['add', 'unlink'], // recreate d.ts when receive these events, all events: ['add', 'unlink', 'change']
    },
  },
};
