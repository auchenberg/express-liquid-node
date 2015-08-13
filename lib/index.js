// Generated by CoffeeScript 1.9.3
(function() {
  var Liquid, Promise, fs, readFile;

  Liquid = require("liquid-node");

  Promise = require("bluebird");

  fs = require("fs");

  readFile = Promise.promisify(fs.readFile, fs);

  module.exports = function(settings) {
    var engine, renderFile;
    engine = new Liquid.Engine;
    renderFile = function(path, options) {
      return readFile(path).then(function(content) {
        return engine.parseAndRender(content, options);
      });
    };
    if (settings.includes) {
      engine.registerFileSystem(new Liquid.LocalFileSystem(settings.includes));
    }
    return function(path, options, cb) {
      if (options.layout) {
        return renderFile(path, options).then(function(pageContent) {
          options.content = pageContent;
          options.body = pageContent;
          return renderFile(options.layout, options).nodeify(cb);
        });
      } else {
        return function(path, options, cb) {
          return renderFile(path, options).nodeify(cb);
        };
      }
    };
  };

}).call(this);

//# sourceMappingURL=index.js.map