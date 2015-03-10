/** @preserve
// ==UserScript==
// @name           @ant-name@
// @namespace      benjol
// @version        @ant-version@
// @description    @ant-description@
// @homepage       @ant-homepage@
// @grant          none
// @ant-sites-userscript@
// ==/UserScript==
*/

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function ($) {
  StackExchange.ready(function () {
    //@ant-modules-autoupdater@

    var siteurl = window.location.hostname;
    var arr = document.title.split(' - ');
    var sitename = arr[arr.length - 1];
    var username = 'user';
    var OP = 'OP';
    var prefix = "AutoReviewComments-"; //prefix to avoid clashes in localstorage
    var myuserid = getLoggedInUserId();

    if(sitename == "Stack Exchange") sitename = arr[arr.length - 2]; //workaround for some SE sites (e.g. Area 51, Stack Apps)
    sitename = sitename.replace(/ ?Stack Exchange/, '');             //same for others ("Android Enthusiasts Stack Exchange", SR, and more)
    if(!GetStorage("WelcomeMessage")) SetStorage("WelcomeMessage", 'Welcome to ' + sitename + '! ');
    var greeting = GetStorage("WelcomeMessage") == "NONE" ? "" : GetStorage("WelcomeMessage");
    var showGreeting = false;

    var markupTemplate = '@ant-templates-popup@';
    var messageTemplate = '@ant-templates-message@';
    var optionTemplate = '@ant-templates-option@';

    //default comments
    var defaultcomments = [
     { Name: "Answers just to say Thanks!", Description: 'Please don\'t add "thanks" as answers. Invest some time in the site and you will gain sufficient <a href="//$SITEURL$/privileges">privileges</a> to upvote answers you like, which is the $SITENAME$ way of saying thank you.' },
     { Name: "Nothing but a URL (and isn't spam)", Description: 'Whilst this may theoretically answer the question, <a href="//meta.stackoverflow.com/q/8259">it would be preferable</a> to include the essential parts of the answer here, and provide the link for reference.' },
     { Name: "Requests to OP for further information", Description: 'This is really a comment, not an answer. With a bit more rep, <a href="//$SITEURL$/privileges/comment">you will be able to post comments</a>. For the moment I\'ve added the comment for you, and I\'m flagging this post for deletion.' },
     { Name: "OP using an answer for further information", Description: 'Please use the <em>Post answer</em> button only for actual answers. You should modify your original question to add additional information.' },
     { Name: "OP adding a new question as an answer", Description: 'If you have another question, please ask it by clicking the <a href="//$SITEURL$/questions/ask">Ask Question</a> button.' },
     { Name: "Another user adding a 'Me too!'", Description: 'If you have a NEW question, please ask it by clicking the <a href="//$SITEURL$/questions/ask">Ask Question</a> button. If you have sufficient reputation, <a href="//$SITEURL$/privileges/vote-up">you may upvote</a> the question. Alternatively, "star" it as a favorite and you will be notified of any new answers.' }
    ];

    var weekday_name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var minute = 60, hour = 3600, day = 86400, sixdays = 518400, week = 604800, month = 2592000, year = 31536000;

    //Wrap local storage access so that we avoid collisions with other scripts
    function GetStorage(key) { return localStorage[prefix + key]; }
    function SetStorage(key, val) { localStorage[prefix + key] = val; }
    function RemoveStorage(key) { localStorage.removeItem(prefix + key); }
    function ClearStorage(startsWith) {
      for(var i = localStorage.length - 1; i >= 0; i--) {
        var key = localStorage.key(i);
        if(key.indexOf(prefix + startsWith) == 0) localStorage.removeItem(key);
      }
    }

    //Calculate and format datespan for "Member since/for"
    function datespan(date) {
      var now = new Date() / 1000;
      var then = new Date(date * 1000);
      var today = new Date().setHours(0, 0, 0) / 1000;
      var nowseconds = now - today;
      var elapsedSeconds = now - date;
      var strout = "";
      if(elapsedSeconds < nowseconds) strout = "since today";
      else if(elapsedSeconds < day + nowseconds) strout = "since yesterday";
      else if(elapsedSeconds < sixdays) strout = "since " + weekday_name[then.getDay()];
      else if(elapsedSeconds > year) {
        strout = "for " + Math.round((elapsedSeconds) / year) + " years";
        if(((elapsedSeconds) % year) > month) strout += ", " + Math.round(((elapsedSeconds) % year) / month) + " months";
      }
      else if(elapsedSeconds > month) {
        strout = "for " + Math.round((elapsedSeconds) / month) + " months";
        if(((elapsedSeconds) % month) > week) strout += ", " + Math.round(((elapsedSeconds) % month) / week) + " weeks";
      }
      else {
        strout = "for " + Math.round((elapsedSeconds) / week) + " weeks";
      }
      return strout;
    }

    //Calculate and format datespan for "Last seen"
    function lastseen(date) {
      var now = new Date() / 1000;
      var today = new Date().setHours(0, 0, 0) / 1000;
      var nowseconds = now - today;
      var elapsedSeconds = now - date;
      if(elapsedSeconds < minute) return (Math.round(elapsedSeconds) + " seconds ago");
      if(elapsedSeconds < hour) return (Math.round((elapsedSeconds) / minute) + " minutes ago");
      if(elapsedSeconds < nowseconds) return (Math.round((elapsedSeconds) / hour) + " hours ago");
      if(elapsedSeconds < day + nowseconds) return ("yesterday");
      var then = new Date(date * 1000);
      if(elapsedSeconds < sixdays) return ("on " + weekday_name[then.getDay()]);
      return then.toDateString();
    }

    //Format reputation string
    function repNumber(r) {
      if(r < 1E4) return r;
      else if(r < 1E5) {
        var d = Math.floor(Math.round(r / 100) / 10);
        r = Math.round((r - d * 1E3) / 100);
        return d + (r > 0 ? "." + r : "") + "k"
      }
      else return Math.round(r / 1E3) + "k"
    }

    // Get the Id of the logged-in user
    function getLoggedInUserId() {
      if ( document.getElementsByClassName('profile-me')[0].href.match(/\/users\/(\d+)\/.*/i) ) {
        return RegExp.$1;
      } else {
        return '';
      }
    }

    //Get userId for post
    function getUserId(el) {
      // a bit complicated, but we have to avoid edits (:last), not trip on CW questions (:not([id])), and not bubble
      //  out of post scope for deleted users (first()).
      var userlink = el.parents('div').find('.post-signature:last').first().find('.user-details > a:not([id])');
      if(userlink.length) return userlink.attr('href').split('/')[2];
      return "[NULL]";
    }
    function isNewUser(date) {
      return (new Date() / 1000) - date < week
    }
    function getOP() {
      var userlink = $('#question').find('.owner').find('.user-details > a:not([id])');
      if(userlink.length) return userlink.text();
      var user = $('#question').find('.owner').find('.user-details'); //for deleted users
      if(user.length) return user.text();
      return "[NULL]";
    }

    //Ajax to Stack Exchange api to get basic user info, and paste into userinfo element
    //http://soapi.info/code/js/stable/soapi-explore-beta.htm
    function getUserInfo(userid, container) {
      var userinfo = container.find('#userinfo');
      if(isNaN(userid)) {
        userinfo.fadeOutAndRemove();
        return;
      }
      $.ajax({
        type: "GET",
        url: '//api.stackexchange.com/2.2/users/' + userid + '?site=' + siteurl + '&jsonp=?',
        dataType: "jsonp",
        timeout: 2000,
        success: function (data) {
          if(data['items'].length > 0) {
            var user = data['items'][0];
            if(isNewUser(user['creation_date'])) {
              showGreeting = true;
              container.find('.action-desc').prepend(greeting);
            }
            username = user['display_name'];
            var usertype = user['user_type'].charAt(0).toUpperCase() + user['user_type'].slice(1);
            var html = usertype + ' user <strong><a href="/users/' + userid + '" target="_blank">' + username + '</a></strong>,     \
                            member <strong>' + datespan(user['creation_date']) + '</strong>,                                        \
                            last seen <strong>' + lastseen(user['last_access_date']) + '</strong>,                                  \
                            reputation <strong>' + repNumber(user['reputation']) + '</strong>';

            userinfo.html(html.replace(/ +/g, ' '));
          }
          else userinfo.fadeOutAndRemove();
        },
        error: function () { userinfo.fadeOutAndRemove(); }
      });
    }

    //Show textarea in front of popup to import/export all comments (for other sites or for posting somewhere)
    function ImportExport(popup) {
      var tohide = popup.find('#main');
      var div = $('<div><textarea/><a class="jsonp">jsonp</a><span class="lsep"> | </span><a class="save">save</a><span class="lsep"> | </span><a class="cancel">cancel</a></div>');
      //Painful, but shortest way I've found to position div over the tohide element
      div.css({ position: 'absolute', left: tohide.position().left, top: tohide.position().top,
        width: tohide.css('width'), height: tohide.css('height'), background: 'white'
      });

      var txt = '';
      for(var i = 0; i < GetStorage("commentcount"); i++) {
        var name = GetStorage('name-' + i);
        var desc = GetStorage('desc-' + i);
        txt += '###' + name + '\n' + htmlToMarkDown(desc) + '\n\n'; //the leading ### makes prettier if pasting to markdown, and differentiates names from descriptions
      }

      div.find('textarea').width('100%').height('95%').val(txt);
      div.find('.jsonp').click(function () {
        var txt = 'callback(\n[\n';
        for(var i = 0; i < GetStorage("commentcount"); i++) {
          txt += '{ "name": "' + GetStorage('name-' + i) + '", "description": "' + GetStorage('desc-' + i).replace(/"/g, '\\"') + '"},\n\n';
        }
        div.find('textarea').val(txt + ']\n)');
        div.find('a:lt(2)').remove(); div.find('.lsep:lt(2)').remove();
      });
      div.find('.cancel').click(function () { div.fadeOutAndRemove(); });
      div.find('.save').click(function () { DoImport(div.find('textarea').val()); WriteComments(popup); div.fadeOutAndRemove(); });

      popup.append(div);
    }

    //Import complete text into comments
    function DoImport(text) {
      //clear out any existing stuff
      ClearStorage("name-"); ClearStorage("desc-");
      var arr = text.split('\n');
      var nameIndex = 0, descIndex = 0;
      for(var i = 0; i < arr.length; i++) {
        var line = $.trim(arr[i]);
        if(line.indexOf('#') == 0) {
          var name = line.replace(/^#+/g, '');
          SetStorage('name-' + nameIndex, name);
          nameIndex++;
        }
        else if(line.length > 0) {
          var desc = markDownToHtml(line);
          SetStorage('desc-' + descIndex, Tag(desc));
          descIndex++;
        }
      }
      //This is de-normalised, but I don't care.
      SetStorage("commentcount", Math.min(nameIndex, descIndex));
    }

    function htmlToMarkDown(html) {
      markdown = html.replace(/<a href="(.+?)">(.+?)<\/a>/g, '[$2]($1)').replace(/&amp;/g, '&');
      return markdown.replace(/<em>(.+?)<\/em>/g, '*$1*').replace(/<strong>(.+?)<\/strong>/g, '**$1**');
    }

    function markDownToHtml(markdown) {
      html = markdown.replace(/\[([^\]]+)\]\((.+?)\)/g, '<a href="$2">$1</a>');
      return html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*([^`]+?)\*/g, '<em>$1</em>');
    }

    function UnTag(text) {
      return text.replace(/\$SITENAME\$/g, sitename).replace(/\$SITEURL\$/g, siteurl).replace(/\$MYUSERID\$/g, myuserid);
    }

    function Tag(html) {
      //put tags back in
      var regname = new RegExp(sitename, "g"), regurl = new RegExp('//' + siteurl, "g"), reguid = new RegExp('/' + myuserid + '[)]', "g");
      return html.replace(regname, '$SITENAME$').replace(regurl, '//$SITEURL$').replace(reguid, '/$MYUSERID$)');
    }

    //Replace contents of element with a textarea (containing markdown of contents), and save/cancel buttons
    function ToEditable(el) {
      var backup = el.html();
      var html = Tag(el.html().replace(greeting, ''));  //remove greeting before editing..
      if(html.indexOf('<textarea') > -1) return; //don't want to create a new textarea inside this one!
      var txt = $('<textarea />').css('height', 2 * el.height())
                .css('width', el.css('width'))
                .val(htmlToMarkDown(html));

      BorkFor(el); //this is a hack
      //save/cancel links to add to textarea
      var commands = $('<a>save</a>').click(function () { SaveEditable($(this).parent()); UnborkFor(el); })
                      .add('<span class="lsep"> | </span>')
                      .add($('<a>cancel</a>').click(function () { CancelEditable($(this).parent(), backup); UnborkFor(el); }));
      //set contents of element to textarea with links
      el.html(txt.add(commands));
    }

    //This is to stop the input pinching focus when I click inside textarea
    //Could have done something clever with contentEditable, but this is evil, and it annoys Yi :P
    function BorkFor(el) {
      var label = el.parent('label');
      label.attr('for', 'borken');
    }
    function UnborkFor(el) {
      var label = el.parent('label');
      label.attr('for', label.prev().attr('id'));
    }
    //Save textarea contents, replace element html with new edited content
    function SaveEditable(el) {
      var html = markDownToHtml(el.find('textarea').val());
      SetStorage(el.attr('id'), Tag(html));
      el.html((showGreeting ? greeting : "") + UnTag(html));
    }

    function CancelEditable(el, backup) {
      el.html(backup);
    }

    //Empty all custom comments from storage and rewrite to ui
    function ResetComments() {
      ClearStorage("name-"); ClearStorage("desc-");
      $.each(defaultcomments, function (index, value) {
        SetStorage('name-' + index, value["Name"]);
        SetStorage('desc-' + index, value["Description"]);
      });
      SetStorage("commentcount", defaultcomments.length);
    }

    //rewrite all comments to ui (typically after import or reset)
    function WriteComments(popup) {
      if(!GetStorage("commentcount")) ResetComments();
      var ul = popup.find('.action-list');
      ul.empty();
      for(var i = 0; i < GetStorage("commentcount"); i++) {
        var commenttype = GetCommentType(GetStorage('name-' + i));
        if(commenttype == "any" || (commenttype == popup.posttype)) {
          var desc = GetStorage('desc-' + i).replace(/\$SITENAME\$/g, sitename).replace(/\$SITEURL\$/g, siteurl).replace(/\$MYUSERID\$/g, myuserid).replace(/\$/g, "$$$");
          var opt = optionTemplate.replace(/\$ID\$/g, i)
                          .replace("$NAME$", GetStorage('name-' + i).replace(/\$/g, "$$$"))
                          .replace("$DESCRIPTION$", (showGreeting ? greeting : "") + desc);
          ul.append(opt);
        }
      }
      ShowHideDescriptions(popup);
      AddOptionEventHandlers(popup);
    }

    function GetCommentType(comment) {
      if(comment.indexOf('[Q]') > -1) return "question";
      if(comment.indexOf('[A]') > -1) return "answer";
      return "any";
    }

    function AddOptionEventHandlers(popup) {
      popup.find('label > span').dblclick(function () { ToEditable($(this)); });
      //add click handler to radio buttons
      popup.find('input:radio').click(function () {
        popup.find('.popup-submit').removeAttr("disabled"); //enable submit button
        //unset/set selected class, hide others if necessary
        $(this).parents('ul').find('.action-selected').removeClass('action-selected');
        if(GetStorage('hide-desc') == "hide") {
          $(this).parents('ul').find('.action-desc').hide();
        }
        $(this).parent().addClass('action-selected')
                        .find('.action-desc').show();
      });
      popup.find('input:radio').keyup(function (event) {
        if(event.which == 13) {
          event.preventDefault();
          popup.find('.popup-submit').trigger('click');
        }
      });
    }

    //Adjust the descriptions so they show or hide based on the user's preference.
    function ShowHideDescriptions(popup) {
      //get list of all descriptions except the currently selected one
      var descriptions = popup.find("ul.action-list li:not(.action-selected) span[id*='desc-']");

      if(GetStorage('hide-desc') == "hide") {
        descriptions.hide();
      }
      else {
        descriptions.show();
      }
    }

    //Show a message (like notify.show) inside popup
    function ShowMessage(popup, title, body, callback) {
      var html = body.replace(/\n/g, '<BR/>');
      var message = $(messageTemplate.replace("$TITLE$", title)
                          .replace('$BODY$', html));
      message.find('.notify-close').click(function () {
        $(this).parent().fadeOutAndRemove();
        callback();
      });
      popup.find('h2').before(message);
    }

    //Get remote content via ajax, target url must contain valid json wrapped in callback() function
    function GetRemote(url, callback, onerror) {
      $.ajax({ type: "GET", url: url + '?jsonp=?', dataType: "jsonp", jsonpCallback: "callback", timeout: 2000, success: callback, error: onerror, async: false });
    }

    //customise welcome
    //reverse compatible!
    function LoadFromRemote(url, done, error) {
      GetRemote(url, function (data) {
        SetStorage("commentcount", data.length);
        ClearStorage("name-"); ClearStorage("desc-");
        $.each(data, function (index, value) {
          SetStorage('name-' + index, value.name);
          SetStorage('desc-' + index, markDownToHtml(value.description));
        });
        done();
      }, error);
    }

    //Factored out from main popu creation, just because it's too long
    function SetupRemoteBox(popup) {
      var remote = popup.find('#remote-popup');
      var remoteerror = remote.find('#remoteerror1');
      var urlfield = remote.find('#remoteurl');
      var autofield = remote.find('#remoteauto');
      var throbber = remote.find("#throbber1");

      popup.find('.popup-actions-remote').click(function () {
        urlfield.val(GetStorage("RemoteUrl"));
        autofield.prop('checked', GetStorage("AutoRemote") == 'true');
        remote.show();
      });

      popup.find('.remote-cancel').click(function () {
        throbber.hide();
        remoteerror.text("");
        remote.hide();
      });

      popup.find('.remote-save').click(function () {
        SetStorage("RemoteUrl", urlfield.val());
        SetStorage("AutoRemote", autofield.prop('checked'));
        remote.hide();
      });

      popup.find('.remote-get').click(function () {
        throbber.show();
        LoadFromRemote(urlfield.val(), function () {
          WriteComments(popup);
          throbber.hide();
        }, function (d, msg) {
          remoteerror.text(msg);
        });
      });
    }

    function SetupWelcomeBox(popup) {
      var welcome = popup.find('#welcome-popup');
      var custom = welcome.find('#customwelcome');

      popup.find('.popup-actions-welcome').click(function () {
        custom.val(greeting);
        welcome.show();
      });

      popup.find('.welcome-cancel').click(function () {
        welcome.hide();
      });

      popup.find('.welcome-force').click(function () {
        showGreeting = true;
        WriteComments(popup);
        welcome.hide();
      });

      popup.find('.welcome-save').click(function () {
        var msg = custom.val() == "" ? "NONE" : custom.val();
        SetStorage("WelcomeMessage", msg);
        greeting = custom.val();
        welcome.hide();
      });
    }

    //This is where the real work starts - add the 'auto' link next to each comment 'help' link
    //use most local root-nodes possible (have to exist on page load) - #questions is for review pages
    $("#content").delegate(".comments-link", "click", function () {
      var divid = $(this).parent().attr('id').replace('-link', '');
      var posttype = $(this).parents(".question, .answer").attr("class").split(' ')[0]; //slightly fragile

      if($('#' + divid).find('.comment-auto-link').length > 0) return; //don't create auto link if already there
      var newspan = $('<span class="lsep"> | </span>').add($('<a class="comment-auto-link">auto</a>').click(function () {
        //Create popup and wire-up the functionality
        var popup = $(markupTemplate);
        popup.find('.popup-close').click(function () { popup.fadeOutAndRemove(); });
        popup.posttype = posttype;

        //Reset this, otherwise we get the greeting twice...
        showGreeting = false;

        //create/add options
        WriteComments(popup);

        //Add handlers for command links
        popup.find('.popup-actions-cancel').click(function () { popup.fadeOutAndRemove(); });
        popup.find('.popup-actions-reset').click(function () { ResetComments(); WriteComments(popup); });
        popup.find('.popup-actions-see').hover(function () {
          popup.fadeTo('fast', '0.4').children().not('#close').fadeTo('fast', '0.0')
        }, function () {
          popup.fadeTo('fast', '1.0').children().not('#close').fadeTo('fast', '1.0')
        });
        popup.find('.popup-actions-impexp').click(function () { ImportExport(popup); });
        popup.find('.popup-actions-toggledesc').click(function () {
          var hideDesc = GetStorage('hide-desc') || "show";
          SetStorage('hide-desc', hideDesc == "show" ? "hide" : "show");
          ShowHideDescriptions(popup);
        });
        //Handle remote url & welcome
        SetupRemoteBox(popup);
        SetupWelcomeBox(popup);

        //on submit, convert html to markdown and copy to comment textarea
        popup.find('.popup-submit').click(function () {
          var selected = popup.find('input:radio:checked');
          var markdown = htmlToMarkDown(selected.parent().find('.action-desc').html()).replace(/\[username\]/g, username).replace(/\[OP\]/g, OP);
          $('#' + divid).find('textarea').val(markdown).focus();  //focus provokes character count test
          var caret = markdown.indexOf('[type here]')
          if(caret >= 0) $('#' + divid).find('textarea')[0].setSelectionRange(caret, caret + '[type here]'.length);
          popup.fadeOutAndRemove();
        });

        //Auto-load from remote if required
        if(!window.VersionChecked && GetStorage("AutoRemote") == 'true') {
          var throbber = popup.find("#throbber2");
          var remoteerror = popup.find('#remoteerror2');
          throbber.show();
          LoadFromRemote(GetStorage("RemoteUrl"),
            function () { WriteComments(popup); throbber.hide(); },
            function (d, msg) { remoteerror.text(msg); });
        }

        //add popup and center on screen
        $('#' + divid).append(popup);
        popup.center();
        StackExchange.helpers.bindMovablePopups();

        //Get user info and inject
        var userid = getUserId($(this));
        getUserInfo(userid, popup);
        OP = getOP();

        //We only actually perform the updates check when someone clicks, this should make it less costly, and more timely
        //also wrap it so that it only gets called the *FIRST* time we open this dialog on any given page (not much of an optimisation).
        if(typeof CheckForNewVersion == "function" && !window.VersionChecked) { CheckForNewVersion(popup); window.VersionChecked = true; }
      }));

      setTimeout(function() {
        $('#' + divid).find('.comment-help-link').parent().append(newspan);
      }, 15);
    });
  });
});
