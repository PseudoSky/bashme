#!/usr/bin/env node;

var program = require('commander');
var colors = require('colors');
var pp=require('./lib/pretty').pd;
var sys = require('sys');
var path = require('path');
var exec = require('child_process').exec;
var child;


var Finder = require('fs-finder');
var jsonfile = require('jsonfile')
var _ = require('lodash');

var res={};
program
  .version('0.0.4')
  .command('search [expression] [directory]','Search for files with simple expressions')
  // .description('Ip address to geolocate IPV4 or IPV6, find locations of all the comma separated ips')
  .action(function(expression, directory){
	  if (!expression || expression=="") {
	    program.outputHelp(make_red);
	    return null;
	  }
	  directory=directory||path.join(__dirname,'');

    expression = expression.trim().split(',');
    console.log(pp.json(_.map(expression,function(e){return find_from(e.trim(),directory);})));
    // console.log('setup for %s env(s) with %s mode', ips, mode);
    _.map(_.orderBy(_.values(res), ['count', 'name'], ['desc', 'asc']), _.values);
  }).parse(process.argv);


function find_from(search,directory){
	directory=directory||path.join(__dirname,'');
	Finder.from(directory).findFiles(search, function(files) {

		 console.log('The Models Found in the API Are:',files.join('\n'));

		 _.map(files, function(f){
		 	if(res[f])res[f].count+=1;
		 	else res[f]={name:f,count:1};	 
		 });

		// Write to the JSONSchema.json file (with indentation)
		jsonfile.writeFileSync('env.json', JSONSchema, {spaces: 2});
	});
}

 


// // executes `pwd`
// child = exec("pwd", function (error, stdout, stderr) {
//   sys.print('stdout: ' + stdout);
//   sys.print('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }
// });
// // or more concisely
// var sys = require('sys')
// var exec = require('child_process').exec;
// function puts(error, stdout, stderr) { sys.puts(stdout) }
// exec("ls -la", puts);