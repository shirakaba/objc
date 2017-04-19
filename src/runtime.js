
const ffi = require('ffi');

const libobjc = new ffi.Library('libobjc', {
  objc_getClass: ['pointer', ['string']] // eslint-disable-line camelcase
});

module.exports = {
  getClass: name => {
    return libobjc.objc_getClass(name);
  },

  classExists: name => {
    return module.exports.getClass(name) !== null;
  },

  import: name => {
    let path = `/System/Library/${name}.framework/${name}`;
    return new ffi.DynamicLibrary(path);
  }
};
