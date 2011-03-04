// ==UserScript==
// @name           AutoReviewComments
// @namespace      benjol
// @version        1.0.7
// @description    Add pro-forma comments dialog for reviewing (pre-flag)
// @include        http://*stackoverflow.com/questions*
// @include        http://*serverfault.com/questions*
// @include        http://*superuser.com/questions*
// @include        http://*stackexchange.com/questions*
// @include        http://*askubuntu.com/questions*
// @include        http://*answers.onstartups.com/questions*
// @include        http://mathoverflow.net/questions*
// @include        http://discuss.area51.stackexchange.com/questions/*
// @include        http://stackapps.com/questions*
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function ($) {
  $(function () {
    var scriptVersion = '1.0.7';  //<<<<<<<<<<<<*********************** DON'T FORGET TO UPDATE THIS!!!! *************************
    var siteurl = 'http://' + window.location.hostname; //include http in here so we don't get confusion between so and meta.so
    var arr = document.title.split(' - ');
    var sitename = arr[arr.length - 1];
    if(sitename == "Stack Exchange") sitename = arr[arr.length - 2]; //workaround for SE sites..
    var greeting = 'Welcome to ' + sitename + '! ';

    var markup = '                                          \
    <div id="popup" class="popup" style="width:690px; position: absolute; display: block"> \
       <div class="popup-close"><a title="close this popup (or hit Esc)">&#215;</a></div> \
       <h2>Which review comment to insert?</h2>             \
       <div style="overflow:hidden" id="main">              \
         <div class="popup-active-pane">                    \
           <div id="userinfo" class="owner" style="padding:5px">    \
              <img src="http://sstatic.net/img/progress-dots.gif"/> \
           </div>                                           \
          <ul class="action-list" >                         \
          </ul>                                             \
         </div>                                             \
         <div class="popup-actions">                        \
          <div style="float: left; margin-top: 18px;">      \
            <a title="close this popup (or hit Esc)" class="popup-actions-cancel">cancel</a>      \
            <span class="lsep"> | </span>                   \
            <a title="see info about this popup" class="popup-actions-help" href="http://stackapps.com/q/2116" target="_blank">info</a>  \
            <span class="lsep"> | </span>                   \
            <a class="popup-actions-see">see-through</a>    \
            <span class="lsep"> | </span>                   \
            <a title="reset any custom comments" class="popup-actions-reset">reset</a>    \
            <span class="lsep"> | </span>                   \
            <a title="use this to import/export all comments" class="popup-actions-impexp">import/export</a>    \
          </div>                                            \
          <div style="float:right">                         \
            <input class="popup-submit" type="button" disabled="disabled" style="float:none; margin-left: 5px" value="Insert">  \
          </div>                                            \
         </div>                                             \
       </div>                                               \
    </div>';

    var option = '                                                          \
    <li>                                                                    \
      <input id="comment-$ID$" type="radio" name="commentreview"/>          \
      <label for="comment-$ID$">                                            \
        <span id="name-$ID$" class="action-name">$NAME$</span>              \
        <span id="desc-$ID$" class="action-desc">$DESCRIPTION$</span>       \
      </label>                                                              \
    </li>';

    //default comments
    var comments = [
     { Name: "Answers just to say Thanks!", Description: 'Please don\'t add "thanks" as answers. Invest some time in the site and you will gain sufficient <a href="$SITEURL$/privileges">privileges</a> to upvote answers you like, which is the $SITENAME$ way of saying thank you.' },
     { Name: "Nothing but a URL (and isn't spam)", Description: 'Whilst this may theoretically answer the question, <a href="http://meta.stackoverflow.com/q/8259">it would be preferable</a> to include the essential parts of the answer here, and provide the link for reference.' },
     { Name: "Requests to OP for further information", Description: 'This is really a comment, not an answer. With a bit more rep, <a href="$SITEURL$/privileges/comment">you will be able to post comments</a>. For the moment I\'ve added the comment for you, and I\'m flagging this post for deletion.' },
     { Name: "OP using an answer for further information", Description: 'Please use the <em>Post answer</em> button only for actual answers. You should modify your original question to add additional information.' },
     { Name: "OP adding a new question as an answer", Description: 'If you have another question, please ask it by clicking the <a href="$SITEURL$/questions/ask">Ask Question</a> button.' },
     { Name: "Another user adding a 'Me too!'", Description: 'If you have a NEW question, please ask it by clicking the <a href="$SITEURL$/questions/ask">Ask Question</a> button. If you have sufficient reputation, <a href="$SITEURL$/privileges/vote-up">you may upvote</a> the question. Alternatively, "star" it as a favorite and you will be notified of any new answers.' },
    ];

    var weekday_name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var minute = 60, hour = 3600, day = 86400, sixdays = 518400, week = 604800, month = 2592000, year = 31536000;

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

    //Get userId for post
    function getUserId(el) {
      return el.parents('div').find('.post-signature:last').find('.user-details > a').attr('href').split('/')[2];
    }
    function isNewUser(date) {
      return (new Date() / 1000) - date < week
    }

    //Ajax to Stack Exchange api to get basic user info, and paste into userinfo element
    //http://soapi.info/code/js/stable/soapi-explore-beta.htm
    function getUserInfo(userid, container) {
      var userinfo = container.find('#userinfo');
      $.ajax({
        type: "GET",
        url: siteurl.replace('http://', 'http://api.') + '/1.0/users/' + userid + '?jsonp=?',
        dataType: "jsonp",
        timeout: 2000,
        success: function (data) {
          if(data['users'].length > 0) {
            var user = data['users'][0];
            if(isNewUser(user['creation_date'])) container.find('.action-desc').prepend(greeting);

            var html = 'User <strong><a href="/users/' + userid + '" target="_blank">' + user['display_name'] + '</a></strong>,     \
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
      var div = $('<div><textarea/><a class="save">save</a><span class="lsep"> | </span><a class="cancel">cancel</a></div>');
      //Painful, but shortest way I've found to position div over the tohide element
      div.css('position', 'absolute').css('left', tohide.position().left).css('top', tohide.position().top)
          .css('width', tohide.css('width')).css('height', tohide.css('height')).css('background', 'white');

      var txt = '';
      $.each(comments, function (index, value) {
        var name = localStorage['name-' + index] || value["Name"];
        var desc = localStorage['desc-' + index] || value["Description"];
        txt += '###' + name + '\n' + desc + '\n\n'; //the leading ### makes prettier if pasting to markdown, and differentiates names from descriptions
      });

      div.find('textarea').width('100%').height('95%').attr('value', txt);
      div.find('.cancel').click(function () { div.fadeOutAndRemove(); });
      div.find('.save').click(function () { DoImport(div.find('textarea').attr('value')); RewriteComments(popup); div.fadeOutAndRemove(); });

      popup.append(div);
    }

    //Import complete text into comments
    function DoImport(text) {
      var arr = text.split('\n');
      var nameIndex = 0, descIndex = 0;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].indexOf('#') == 0) {
          var name = arr[i].replace(/^#+/g, '');
          Save('name-' + nameIndex, name);
          nameIndex++;
        }
        else if(arr[i].length > 0) {
          var desc = arr[i];
          Save('desc-' + descIndex, desc);
          descIndex++;
        }
      }
    }

    function htmlToMarkDown(html) {
      markdown = html.replace(/<a href="(.+?)">(.+?)<\/a>/g, '[$2]($1)');
      return markdown.replace(/<em>(.+?)<\/em>/g, '*$1*').replace(/<strong>(.+?)<\/strong>/g, '**$1**');
    }

    function markDownToHtml(markdown) {
      html = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
      return html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
    }
    //Replace contents of element with a textarea (containing markdown of contents), and save/cancel buttons
    function ToEditable(el) {
      var html = el.html();
      if(html.indexOf('<textarea') > -1) return; //don't want to create a new textarea inside this one!
      var txt = $('<textarea />').css('height', 2 * el.height())
                .css('width', el.css('width'))
                .attr('value', htmlToMarkDown(html).replace(greeting, '')); //remove greeting before editing..
      
      BorkFor(el); //this is a hack
      //save/cancel links to add to textarea
      var commands = $('<a>save</a>').click(function () { SaveEditable($(this).parent()); UnborkFor(el); })
                      .add('<span class="lsep"> | </span>')
                      .add($('<a>cancel</a>').click(function () { CancelEditable($(this).parent(), html); UnborkFor(el); }));
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
      var html = markDownToHtml(el.find('textarea').attr('value'));
      var regname = new RegExp(sitename, "g"), regurl = new RegExp(siteurl, "g");
      //put tags back in (in preparation for import/export)
      var taggedhtml = html.replace(regname, '$SITENAME$').replace(regurl, '$SITEURL$'); 
      Save(el.attr('id'), taggedhtml);
      el.html(html);
    }
    function CancelEditable(el, backup) {
      el.html(backup);
    }
    //only insert into storage if not same as default
    function Save(id, value) {
      var def = GetDefaultOf(id);
      if(def != value)
        localStorage.setItem(id, value);
      else
        localStorage.removeItem(id);
    }
    //Get default name/desc of given id
    function GetDefaultOf(id) {
      var index = id.replace(/[^\d]*/g, '');
      if(id.indexOf('name') > -1)
        return comments[index]["Name"];
      else
        return comments[index]["Description"];
    }
    //Empty all custom comments from storage and rewrite to ui
    function ResetComments(popup) {
      for(var i = 0; i < comments.length; i++) {
        localStorage.removeItem('name-' + i);
        localStorage.removeItem('desc-' + i);
      }
      RewriteComments(popup);
    }
    //rewrite all comments to ui (typically after import or reset)
    function RewriteComments(popup) {
      $.each(comments, function (index, value) {
        var name = localStorage['name-' + index] || value["Name"];
        var desc = localStorage['desc-' + index] || value["Description"];
        popup.find('#name-' + index).html(name);
        popup.find('#desc-' + index).html(desc.replace(/\$SITENAME\$/g, sitename).replace(/\$SITEURL\$/g, siteurl));
      });
    }
    //Gist doesn't yet provide a jsonp api, so we hack by looking for my comments on the stackapps question
    function GetLatestVersion(site, question, user, callback) {
      $.ajax({
        type: "GET",
        url: "http://api." + site + "/1.0/posts/" + question + "/comments?jsonp=?",
        dataType: "jsonp",
        success: function (data) {
          for(var i = 0; i < data["comments"].length; i++) {
            var comment = data["comments"][i];
            if(comment["owner"]["display_name"] == user
                   && comment["body"].match(/^V\d+\.\d+\.\d+/i)) {  //i.e. comment starts with V1.0.0 or similar
              callback(comment["body"].replace(/^V(\d+\.\d+\.\d+).*/i, '$1'));
              break;
            }
          }
        }
      });
    }

    //Check to see if a new version has become available since last check
    // only checks once a day, and won't notify user twice
    function CheckForNewVersion(site, question, user) {
      var today = (new Date().setHours(0, 0, 0, 0));
      var lastCheck = localStorage["LastUpdateCheckDay"];
      if(lastCheck != null && lastCheck != today) {
        GetLatestVersion(site, question, user, function (latestVersion) {
          if(latestVersion != scriptVersion)
            notify.show('A new version (' + latestVersion + ') of the <a href="http://stackapps.com/q/2116">AutoReviewComments</a> is now available (this notification will only appear once per new version).', -123456);
        });
      }
      localStorage.setItem("LastUpdateCheckDay", today);
    }
    //This is where the real work starts - add the 'auto' link next to each comment 'help' link
    $(".comments-link").each(function () {
      var divid = $(this).attr('id').replace('-link', '');
      $(this).click(function () {
        if($('#' + divid).find('.comment-auto-link').length > 0) return; //don't create auto link if already there
        var newspan = $('<span class="lsep"> | </span>').add($('<a class="comment-auto-link">auto</a>').click(function () {
          //Create popup and wire-up the functionality
          var popup = $(markup);
          popup.find('.popup-close').click(function () { popup.fadeOutAndRemove(); });

          //create/add options
          $.each(comments, function (index, value) {
            var name = localStorage['name-' + index] || value["Name"];
            var desc = localStorage['desc-' + index] || value["Description"];
            var opt = option.replace(/\$ID\$/g, index)
                            .replace("$NAME$", name)
                            .replace("$DESCRIPTION$", desc.replace(/\$SITENAME\$/g, sitename).replace(/\$SITEURL\$/g, siteurl));
            popup.find('.action-list').append(opt);
          });
          popup.find('label > span').dblclick(function () { ToEditable($(this)); });
          //add click handler to radio buttons
          popup.find('input:radio').click(function () {
            popup.find('.popup-submit').attr("disabled", ""); //enable submit button
            //unset/set selected class
            $(this).parents('ul').find(".action-selected").removeClass("action-selected");
            $(this).parent().addClass('action-selected');
          });

          //Add handlers for command links
          popup.find('.popup-actions-cancel').click(function () { popup.fadeOutAndRemove(); });
          popup.find('.popup-actions-reset').click(function () { ResetComments(popup); });
          popup.find('.popup-actions-see').hover(function () {
            popup.fadeTo('fast', '0.4').find('.popup-active-pane').fadeTo('fast', '0.0')
          }, function () {
            popup.fadeTo('fast', '1.0').find('.popup-active-pane').fadeTo('fast', '1.0')
          });
          popup.find('.popup-actions-impexp').click(function () { ImportExport(popup); });
          //on submit, convert html to markdown and copy to comment textarea
          popup.find('.popup-submit').click(function () {
            var selected = popup.find('input:radio:checked');
            var markdown = htmlToMarkDown(selected.parent().find('.action-desc').html());
            $('#' + divid).find('textarea').attr('value', markdown).focus();  //focus provokes character count test
            popup.fadeOutAndRemove();
          });
          //add popup and center on screen
          $('#' + divid).append(popup);
          popup.center();

          //Get user info and inject
          var userid = getUserId($(this));
          getUserInfo(userid, popup);

          //We only actually perform the updates check when someone clicks, this should make it less costly, and more timely
          //also wrap it so that it only gets called the *FIRST* time.
          if(!window.VersionChecked) { CheckForNewVersion("stackapps.com", 2116, "Benjol"); window.VersionChecked = true; }
        }));
        $('#' + divid).find('.comment-help-link').parent().append(newspan);
      });
    });
  });
});