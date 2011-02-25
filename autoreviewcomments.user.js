// ==UserScript==
// @name           AutoReviewComments
// @namespace      benjol
// @version        1.0.1
// @description    Add pro-forma comments dialog for reviewing (pre-flag)
// @include        http://*stackoverflow.com/questions*
// @include        http://*.stackexchange.com/questions*
// @include        http://*.askubuntu.com/questions*
// @include        http://*.serverfault.com/questions*
// @include        http://*.superuser.com/questions*
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
    var siteurl = window.location.hostname;
    var arr = document.title.split(' - ');
    var sitename = arr[arr.length - 1];
    if(sitename == "Stack Exchange") sitename = arr[arr.length - 2]; //workaround for SE sites..
    var markup = '                                          \
    <div id="popup" class="popup" style="width:690px; position: absolute; display: block"> \
       <div class="popup-close"><a title="close this popup (or hit Esc)">&#215;</a></div> \
       <div style="overflow:hidden">                        \
         <div class="popup-active-pane">                    \
          <h2>Which review comment to insert?</h2>          \
           <div id="userinfo" class="owner" style="padding:5px">    \
              <img src="http://sstatic.net/img/progress-dots.gif"/> \
           </div>                                           \
          <ul class="action-list" >                         \
          </ul>                                             \
         </div>                                             \
         <div class="popup-actions">                        \
          <div style="float: left; margin-top: 18px;">      \
            <a class="popup-actions-cancel">cancel</a>      \
            <span class="lsep"> | </span>                   \
            <a class="popup-actions-help" href="http://meta.stackoverflow.com/questions/74194/how-to-review-can-we-agree-on-a-review-policy" target="_blank">info</a>  \
            <span class="lsep"> | </span>                   \
            <a class="popup-actions-see">see-through</a>    \
          </div>                                            \
          <div style="float:right">                         \
            <input class="popup-submit" type="button" disabled="disabled" style="float:none; margin-left: 5px" value="Insert">  \
          </div>                                            \
         </div>                                             \
       </div>                                               \
    </div>';

    var option = '                                          \
    <li>                                                    \
      <input id="$ID$" type="radio" name="commentreview"/>  \
      <label for="$ID$">                                    \
        <span class="action-name">$NAME$</span>             \
        <span class="action-desc">$DESCRIPTION$</span>      \
      </label>                                              \
    </li>';

    var comments = [
     { Name: "Answers just to say Thanks!", Description: 'Please don\'t add "thanks" as answers. Invest some time in the site and you will gain sufficient <a href="http://$SITEURL$/priveleges">privileges</a> to upvote answers you like, which is the $SITENAME$ way of saying thank you.' },
     { Name: "Nothing but a URL (and isn't spam)", Description: 'Whilst this may theoretically answer the question, <a href="http://meta.stackoverflow.com/questions/8231/are-answers-that-just-contain-links-elsewhere-really-good-answers/8259#8259">it would be preferable</a> to include the essential parts of the answer here, and provide the link for reference.' },
     { Name: "Requests to OP for further information", Description: 'This is really a comment, not an answer. With a bit more rep, <a href="http://$SITEURL$/privileges/comment">you will be able to post comments</a>. For the moment I\'ve added the comment for you, and I\'m flagging this post for deletion.' },
     { Name: "OP using an answer for further information", Description: 'Please use the <em>Post answer</em> button only for actual answers. You should modify your original question to add additional information.' },
     { Name: "OP adding a new question as an answer", Description: 'If you have another question, please ask it by clicking the <a href="http://$SITEURL$/questions/ask">Ask Question</a> button.' },
     { Name: "Another user adding a 'Me too!'", Description: 'If you have a NEW question, please ask it by clicking the <a href="http://$SITEURL$/questions/ask">Ask Question</a> button. If you have sufficient reputation, <a href="http://$SITEURL$/privileges/vote-up">you may upvote</a> the question. Alternatively, "star" it as a favorite and you will be notified of any new answers.' },
    ];

    var weekday_name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var minute = 60, hour = 3600, day = 86400, sixdays = 518400, week = 604800, month = 2592000, year = 31536000;

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

    function repNumber(r) {
      if(r < 1E4) return r;
      else if(r < 1E5) {
        var d = Math.floor(Math.round(r / 100) / 10);
        r = Math.round((a - d * 1E3) / 100);
        return d + (r > 0 ? "." + r : "") + "k"
      }
      else return Math.round(r / 1E3) + "k"
    }

    function getUserId(el) {
      var div = el.parents('div');
      var selector = div.hasClass('answer') ? '.post-signature' : '.post-signature.owner';
      return div.find(selector).find('.user-details > a').attr('href').replace(/[^\d]/g, '');
    }

    function isNewUser(date) {
      return (new Date() / 1000) - date < week
    }

    function htmlToMarkDown(html) {
      html = html.replace(/<a href="(.+?)">(.+?)<\/a>/g, '[$2]($1)');
      return html.replace(/<em>(.+?)<\/em>/g, '*$1*');
    }

    $(".comments-link").each(function () {
      var divid = $(this).attr('id').replace('-link', '');
      $(this).click(function () {
        var newspan = $('<span class="lsep"> | </span>').add($('<a>auto</a>').click(function () {
          //Create popup and wire-up the functionality
          var popup = $(markup);
          popup.find('.popup-close').click(function () { popup.fadeOutAndRemove(); });
          popup.find('.popup-actions-cancel').click(function () { popup.fadeOutAndRemove(); });
          //set opacity on mousedown/mouseup of 'see-through' link
          popup.find('.popup-actions-see').hover(function () {
            popup.fadeTo('fast', '0.4').find('.popup-active-pane').fadeTo('fast', '0.0')
          }, function () {
            popup.fadeTo('fast', '1.0').find('.popup-active-pane').fadeTo('fast', '1.0')
          });
          //on submit, convert html to markdown and copy to comment textarea
          popup.find('.popup-submit').click(function () {
            var selected = popup.find('input:radio:checked');
            var markdown = htmlToMarkDown(selected.parent().find('.action-desc').html());
            $('#' + divid).find('textarea').attr('value', markdown).focus();  //focus provokes character count test
            popup.fadeOutAndRemove();
          });
          //create/add options
          $.each(comments, function (index, value) {
            var opt = option.replace(/\$ID\$/g, "comment-" + index)
                            .replace("$NAME$", value["Name"])
                            .replace("$DESCRIPTION$", value["Description"].replace(/\$SITENAME\$/g, sitename).replace(/\$SITEURL\$/g, siteurl));
            popup.find('.action-list').append(opt);
          });
          //add click handler to radio buttons
          popup.find('input:radio').click(function () {
            popup.find('.popup-submit').attr("disabled", ""); //enable submit button
            //unset/set selected class
            $(this).parents('ul').find(".action-selected").removeClass("action-selected");
            $(this).parent().addClass('action-selected');
          });
          //add popup and scroll into view
          $('#' + divid).append(popup);

          //Get user info and inject
          var userid = getUserId($(this));
          var userinfo = popup.find('#userinfo');
          //http://soapi.info/code/js/stable/soapi-explore-beta.htm
          $.ajax({
            type: "GET",
            url: 'http://api.' + siteurl + '/1.0/users/' + userid + '?jsonp=?',
            dataType: "jsonp",
            timeout: 2000,
            success: function (data) {
              if(data['users'].length > 0) {
                var user = data['users'][0];
                if(isNewUser(user['creation_date'])) {
                  var greeting = 'Welcome to ' + sitename + '! ';
                  popup.find('.action-desc').prepend(greeting);
                }

                var html = 'User <strong><a href="/users/' + userid + '" target="_blank">' + user['display_name'] + '</a></strong>, \
                            member <strong>' + datespan(user['creation_date']) + '</strong>,                                        \
                            last seen <strong>' + lastseen(user['last_access_date']) + '</strong>,                                  \
                            reputation <strong>' + repNumber(user['reputation']) + '</strong>';
                userinfo.html(html);
              }
              else userinfo.fadeOutAndRemove();
            },
            error: function () { userinfo.fadeOutAndRemove(); }
          });

          popup.center();
        }));
        $('#' + divid).find('.comment-help-link').parent().append(newspan);
      });
    });
  });
});
