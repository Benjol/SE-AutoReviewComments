var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
  include: ["@ant-sites-firefox-list@"],
  contentScriptFile: data.url("autoreviewcomments.js"),
  contentScriptWhen: "end"
});
