
const conf = {};
// conf.rootpath = "D:/gulp/csstest";
conf.rootpath = "D:/Workspaces/Phpstorm/h5/h5portal/mainsite/web/2020/03/gulp";
conf.projectPath = conf.rootpath +'/dist'

const detailcss = [
	conf.rootpath+'/src/css/*.css'
];
const detailjs = [
	conf.rootpath+'/src/js/index1.js',
	conf.rootpath+'/src/js/index2.js'
];

const gulp = require('gulp'),
	minifycss = require('gulp-clean-css'), // 压缩css
	concat = require('gulp-concat'), //合并文件
	rename = require('gulp-rename'),//重命名
	postcss = require('gulp-postcss'),//通过多个插件通过管道传递CSS，但是仅解析一次CSS。
	precss = require('precss'),
	autoprefixer = require('autoprefixer'); //根据定制的兼容规则给css添加浏览器前缀插件
	uglify = require('gulp-uglify');//压缩js

const { watch } = require('gulp');

// 处理css
const mergeCss = ()=>{
    return gulp.src(detailcss)
	//.pipe(concat('d.css')) // 合并
	.pipe(postcss([
		autoprefixer({
			// 兼容主流浏览器的版本
			overrideBrowserslist: [
				'last 10 versions',
				'Firefox >= 20',
				'Android >= 4.0',
				'iOS >= 8'
			]
		}),
		precss
	]))
	// .pipe(minifycss()) //压缩
	.pipe(gulp.dest(conf.projectPath))
}

const mergeJs = ()=>{
	return gulp.src(detailjs)
  //  gulp.src('/src/js/*.js')       // 路径问题：gulpfile.js为路径的起点。此路径表示js文件下的所有js文件。
    .pipe(concat('index.all.js'))   //合并成的js文件名称
    .pipe(uglify())            //压缩
    .pipe(gulp.dest(conf.projectPath));    //打包压缩路径。
}

exports.default = gulp.parallel(mergeCss,mergeJs);

//exports.default = function() {
  // You can use a single task
//  watch(detailcss, mergeCss,mergeJs);
//};

console.log('dist => ', conf.projectPath);