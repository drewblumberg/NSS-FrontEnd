module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    qunit: {
      master: {
        options: {
          urls: ["http://localhost:3333/tests/master.html"]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3333,
          hostname: "localhost",
          base: "public"
        }
      }
    },

    copy: {
      images: {
        expand: true,
        src: ["img/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      },
      css: {
        expand: true,
        src: ["css/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      },
      js: {
        expand: true,
        src: ["js/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      }
    },

    concat: {
      js: {
        src: ["public/js/app/*.js"],
        dest: "_build/js/vendor/app-concat.js"
      }
    },

    haml: {
      build: {
        files: {
          "_build/index.html": "public/index.haml",
          "_build/tests/master.html": "public/tests/master.haml"
        }
      }
    },

    clean: ["_build"],

    watch: {
      js: {
        files: ["public/js/app/**/*.js"],
        tasks: ["dev"],
        options: { nospawn: true }
      },
      tests: {
        files: ["public/tests/**/*.html", "public/js/tests/**/*.js"],
        tasks: ["qunit"],
        options: { nospawn: true }
      },
      html: {
        files: ["public/**/*.haml"],
        tasks: ["haml"],
        options: { nospawn: true }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-haml");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("tests", ["connect", "qunit"]);

  grunt.registerTask("build", ["clean", "copy", "haml", "concat"]);
  grunt.registerTask("default", ["tests"]);
};