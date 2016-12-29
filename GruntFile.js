module.exports = function(grunt) {
    var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    gtx.alias('build', [
        // 'recess:less',
        // 'clean:angular',
        // 'copy:libs',
        // 'copy:angular',
        // 'useminPrepare',
        // 'concat:generated',
        // 'cssmin:generated',
        // 'uglify:generated',
        // 'usemin',
        // 'clean:tmp'
    ]);

    gtx.alias('default', [
        'recess:less',
        'connect:server',
        'watch'
    ]);

    gtx.alias('release', ['bump-commit']);
    gtx.alias('release-patch', ['bump-only:patch', 'release']);
    gtx.alias('release-minor', ['bump-only:minor', 'release']);
    gtx.alias('release-major', ['bump-only:major', 'release']);
    gtx.alias('prerelease', ['bump-only:prerelease', 'release']);

    gtx.finalise();
};