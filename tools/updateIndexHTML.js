// updateIndexHTML.js

function updateIndexHTML() {
  this.test = /<script src=\"\/bundle.js"><\/script>/;
}

updateIndexHTML.prototype.apply = function(compiler) {
  const test = this.test;
  compiler.plugin("compilation", function(compilation) {
    // Hook into html-webpack-plugin event
    compilation.plugin('html-webpack-plugin-before-html-processing', function(pluginData, cb) {
      pluginData.html = pluginData.html.replace(test, '');
      pluginData.html += `
        <!-- BEGIN TRACKJS -->
        <script type="text/javascript">window._trackJs = { token: '82d2a1f884ba452580a4250b91979eec' };</script>
        <script type="text/javascript" src="https://cdn.trackjs.com/releases/current/tracker.js"></script>
        <!-- END TRACKJS -->
      `;
      cb(null, pluginData);
    });
  });
};

module.exports = updateIndexHTML;
