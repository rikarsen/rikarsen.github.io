module.exports = {
    less: {
        files: 'src/css/less/**/*.less',
        tasks: ['recess']
    },
    html: {
        files: ['src/**/*.html', 'src/css/**/*.css'],
        options: {
            livereload: 1337
        }
    },
    scripts: {
        files: ['src/js/**/*.js'],
        options: {
            spawn: false,
            livereload: 1337
        }
    }
};
