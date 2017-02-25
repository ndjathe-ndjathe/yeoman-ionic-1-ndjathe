'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the brilliant ' + chalk.red('generator-ionic-1-ndjathe') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is your app\'s name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is your app\'s description?',
        default: 'An Ionic Framework and Cordova project.'
      },
      {
        type: 'checkbox',
        name: 'platforms',
        message: 'Add platforms?',
        choices: [
          {
            name: "Android",
            value: "android",
            checked: true
          },
          {
            name: "Blackberry",
            value: "blackberry10",
            checked: false
          },
          {
            name: "Browser",
            value: "browser",
            checked: false
          },
          {
            name: "Firefox",
            value: "firefoxos",
            checked: false
          },
          {
            name: "iOS",
            value: "ios",
            checked: true
          },
          {
            name: "Web OS",
            value: "webos",
            checked: false
          },
          {
            name: "Windows",
            value: "windows",
            checked: false
          }
        ]
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.name = props.name;
      this.id = "com.ionicframework." + this.name.toLowerCase() + (new Date().getTime().toString().substr(-6));
      console.log("props", props)
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('config.xml'),
      this.destinationPath('config.xml'), {
        name: this.props.name,
        description: this.props.description,
        id: this.id
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name.toLowerCase(),
        description: this.props.name + " : " + this.props.description
      }
    );

    this.fs.copyTpl(
      this.templatePath('ionic.config.json'),
      this.destinationPath('ionic.config.json'), {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copy(
      this.templatePath('hooks/README.md'),
      this.destinationPath('hooks/README.md')
    );

    this.fs.copy(
      this.templatePath('hooks/after_prepare/010_add_platform_class.js'),
      this.destinationPath('hooks/after_prepare/010_add_platform_class.js')
    );

    this.fs.copy(
      this.templatePath('res/**/*'),
      this.destinationPath('res/')
    );

    this.fs.copy(
      this.templatePath('resources/**/*'),
      this.destinationPath('resources/')
    );

    this.fs.copy(
      this.templatePath('scss/**/*'),
      this.destinationPath('scss/')
    );

    this.fs.copy(
      this.templatePath('www/**/*'),
      this.destinationPath('www/')
    );
  },

  install: function () {
    //this.installDependencies();
    this.installDependencies({
      bower: true,
      npm: true,
      skipInstall: false,
      callback: function () {
        //this.spawnCommand('ionic', this.props.platforms);
        for (var i = 0; i < this.props.platforms.length; i++){
          this.spawnCommandSync('ionic', ['platform', 'add', this.props.platforms[i]]);
        }
      }.bind(this) // bind the callback to the parent scope
    });
  }
});
