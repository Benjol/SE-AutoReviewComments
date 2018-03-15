// Self Updating Userscript, see https://gist.github.com/Benjol/874058
// (the first line of this template _must_ be a comment!)
var VERSION = '@ant-version@';
var URL = "https://raw.github.com/Benjol/SE-AutoReviewComments/master/dist/autoreviewcomments.user.js";

// This hack is necessary to bring people up from the last working auto-uptate gist
// release if they manually installed the latest version. (can be removed after some
// time has passed and last released version is at least 1.3.4)
for (var key in window) {
  if (key.indexOf('selfUpdaterCallback') != -1) {
    window[key](VERSION);
    return;
  }
}
// End hack

if (window["AutoReviewComments_AutoUpdateCallback"]) {
  window["AutoReviewComments_AutoUpdateCallback"](VERSION);
  return;
}

// Split int based version number strings on dots, zero-pad the arrays to the same length and
// compare them in order such that true is returned only if the proposted version is newer
function isVersionNewer(proposed, current) {
  proposed = proposed.split(".");
  current = current.split(".");

  while (proposed.length < current.length) proposed.push("0");
  while (current.length < proposed.length) current.push("0");

  for (var i = 0; i < proposed.length; i++) {
    if (parseInt(proposed[i]) > parseInt(current[i])) {
      return true;
    }
    if (parseInt(proposed[i]) < parseInt(current[i])) {
      return false;
    }
  }

  return false;
}

function updateCheck(notifier) {
  window["AutoReviewComments_AutoUpdateCallback"] = function(newver) {
    if (isVersionNewer(newver, VERSION)) notifier(newver, VERSION, URL);
  };
  $("<script />").attr("src", URL).appendTo("head");
}

// Check to see if a new version has become available since last check
// - only checks once a day
// - does not check for first time visitors, shows them a welcome message instead
// - called at the end of the main script if function exists
function CheckForNewVersion(popup) {
  var today = (new Date().setHours(0, 0, 0, 0));
  var LastUpdateCheckDay = GetStorage("LastUpdateCheckDay");
  if (LastUpdateCheckDay == null) { //first time visitor
    ShowMessage(popup, "Please read this!", 'Thanks for installing this script. \
                            Please note that you can EDIT the texts inline by double-clicking them. \
                            For other options, please see the README at <a href="https://github.com/Benjol/SE-AutoReviewComments" target="_blank">here</a>.',
      function() {});
  } else if (LastUpdateCheckDay != today) {
    updateCheck(function(newver, oldver, install_url) {
      if (newver != GetStorage("LastVersionAcknowledged")) {
        ShowMessage(popup, "New Version!", 'A new version (' + newver + ') of the <a href="http://stackapps.com/q/2116">AutoReviewComments</a> userscript is now available, see the <a href="https://github.com/Benjol/SE-AutoReviewComments/releases">release notes</a> for details or <a href="' + install_url + '">click here</a> to install now.',
          function() {
            SetStorage("LastVersionAcknowledged", newver);
          });
      }
    });
  }
  SetStorage("LastUpdateCheckDay", today);
}

/* How does this work?
   1. The installed script loads first, and sets the local VERSION variable with the currently installed version number
   2. window["AutoReviewComments_AutoUpdateCallback"] is not defined, so this is skipped
   3. When updateCheck() is called, it defines window["AutoReviewComments_AutoUpdateCallback"], which retains the installed version number in VERSION (closure)
   4. updateCheck() then loads the external version of the script into the page header
   5. when the external version of the script loads, it defines its own local VERSION with the external (potentially new) version number
   6. window["AutoReviewComments_AutoUpdateCallback"] is now defined, so it is invoked, and the external version number is passed in
   7. if the external version number (ver) is greater than the installed version (VERSION), the notification is invoked
 */
