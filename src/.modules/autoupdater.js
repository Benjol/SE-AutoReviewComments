//**selfupdatingscript starts here (see https://gist.github.com/raw/874058/selfupdatingscript.user.js)
var VERSION = '@ant-version@';
var URL = "https://github.com/Benjol/SE-AutoReviewComments/raw/master/dist/autoreviewcomments.min.user.js";

if(window["selfUpdaterCallback:" + URL]) {
  window["selfUpdaterCallback:" + URL](VERSION);
  return;
}

function updateCheck(notifier) {
  window["selfUpdaterCallback:" + URL] = function (newver) {
    if(newver > VERSION) notifier(newver, VERSION, URL);
  }
  $("<script />").attr("src", URL).appendTo("head");
}
//**selfupdatingscript ends here (except for call to updateCheck further down in code)

//Check to see if a new version has become available since last check
// only checks once a day
function CheckForNewVersion(popup) {
  var today = (new Date().setHours(0, 0, 0, 0));
  var lastCheck = GetStorage("LastUpdateCheckDay");
  if(lastCheck == null) { //first time visitor
    ShowMessage(popup, "Please read this!", 'Thanks for installing this script. \
                            Please note that you can EDIT the texts inline by double-clicking them. \
                            For other options, please see the README at <a href="https://github.com/Benjol/SE-AutoReviewComments" target="_blank">here</a>.',
                function () { });
  }
  if(lastCheck != null && lastCheck != today) {
    var lastVersion = GetStorage("LastVersionAcknowledged");
    updateCheck(function (newver, oldver, url) {
      if(newver != lastVersion) {
        ShowMessage(popup, "New Version!", 'A new version (' + newver + ') of the <a href="http://stackapps.com/q/2116">AutoReviewComments</a> userscript is now available, see the <a href="https://github.com/Benjol/SE-AutoReviewComments/releases">release notes</a> for details. (this notification will only appear once per new version, and per site)',
                    function () { SetStorage("LastVersionAcknowledged", newver); });
      }
    });
  }
  SetStorage("LastUpdateCheckDay", today);
}