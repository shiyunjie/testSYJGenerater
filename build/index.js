'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _console = require('console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
export default {
  setWidth(w){
  const maps = ['w', 's', 'y', 'x'];
   const index = maps.findIndex((item) => { w === item });
    return index;
}
}*/

// 比较重，支持es6  es7 api

var app = (0, _express2.default)(); /**
                                     * Created by shiyunjie on 17/11/21.
                                     */


app.get('/', function (req, res, next) {
  _superagent2.default.get('https://cnodejs.org/').end(function (err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err);
    }
    // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
    // 剩下就都是 jquery 的内容了
    var $ = _cheerio2.default.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      });
    });

    res.send(items);
  });
});

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行。
app.listen(3000, function () {
  _console.Console.log('服务已经启动，正在监听3000端口');
});