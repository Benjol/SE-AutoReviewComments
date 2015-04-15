# AutoReviewComments
## Pro-forma comments for Stack Exchange

### No more re-typing the same comments over and over!

This script adds a little 'auto' link next to all comments boxes. When you click the link, you see a popup with 6 configurable auto-comments (canned responses), which you can easily click to insert.

This script was inspired by answers to [thbris question on meta][1].

![Thumbnail][2]

##Features

1. **Read your comment before you post it!**

    Note that the dialog only *inserts* the text, it doesn't *send* the comment, nor does it flag anything; this is so that you can **check** the text before posting!

1. **Customize the texts**

    Simply [double click][3] on a comment text or description in order to customize it. Hit the 'reset' button if you screw up. This customization is currently **per-site**. Note that the "Welcome to `$SITENAME$`" text is automagically inserted if the user is 'new' (member for less than a week), so you don't *need* to add that to your custom text (but you can if you want to, see '9' below). 
    
    It is possible to target comments to specific use-cases (Answers, Questions, etc.) - see Import/export section below

    If you need more/less than the default 6 comments, just carry on reading...

1. **Quick user info**

    The dialog also includes a mini-summary of the user's activity (because if they haven't been back in months, there's no point writing them a comment).

1. **Automatic notification of new versions**

    The script will also **notify you if a newer version is created**.

1. **Import/export of custom comments**

    This helps with transferring custom comments between sites. The export/import 'format' is also conveniently presented as markdown, so you can post it in an answer below, and let others benefit from your words of wisdom.

    Note that you can also use the Import to create an arbitrary number of comments (the default is 6). If there are too many, you can use the show/hide desc link to gain a bit of space.
    
    The following title prefixes are allowed and permit a comment to be targeted to the associated dialogue:
     
    - Closure : "C",
    - CommentQuestion : "Q",
    - CommentAnswer : "A",
    - EditSummaryAnswer : "EA",
    - EditSummaryQuestion : "EQ"
      
    The expected format for the title prefix (in the import/export dialogue) is: `###[Q] More than one question asked`

1. **Remote source for comments**

    If you get bored with copy/pasting your comments between sites and/or computers, you can use the 'remote' button to define a remote source for your comment texts. See [here][4] for more details.

1. ***Differentiated comments for questions/answers***

    If you prefix your comment title with `[Q]`, it will be only displayed for questions (`[A]` for answers). Non-prefixed comments are displayed for both.

1. **`[type here]`, `[username]` & `[OP]` (& $MYUSERID$)**

    If the text `[type here]` is included in a comment, it will be automatically selected for completion when inserted. `[username]` will be replaced with the user's name (or just 'user' if nothing was found), and [OP] with the original poster's name (if found, else 'OP'). Also, $MYUSERID$ will be replaced with your user id for the current site.

1. **Customise welcome message**

    The default message is "Welcome to $SITENAME$" - which is shown for any 1-week-old users. By clicking on the 'welcome' link at the bottom of the popup, you can opt to change this message, or leave it empty to show no messages at all. You can also 'force' the message for older users on a one-off basis. This is per-site.

    [![Screenshot][5]][6]

## Installation

On most browsers, simple click [here to install the user script][7]. 

**Warning**: On Google Chrome, you need to take other steps, because Google is making things difficult for non-store user scripts. 

Either:

  1. Follow the steps in [the workaround Google provides][8].
  2. Visit the [Chrome store][10]. It may not have the latest version. (Thanks [Derek][9] for uploading it there.)
  3. Use a script manager, like [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en).
  
There are also [browser-specific instructions][11] for other browsers.

You can [preview the code][12].

For more information about user scripts, check out the [[tag:script] tag wiki][13].


## Credits

* [Benjol][14], see [all versions][15] and [commits][16]
* [Tom Wijsman][17], see [v1.0.8][18]
* [balpha][19], see [v1.1.0][20]
* [Sathya][21], see [v1.1.6][22] and [commits][23]
* [ThiefMaster][24], see [v1.2.1][25]
* [Oliver Salzburg][26], see [v1.2.3][27] and [commits][28]
* [Shog9][29], see [v1.2.4][30]
* [PeeHaa][31], see [v1.2.9][32]
* [Derek][33], see [v1.2.9][34] and [commits][35]
* [Caleb][36], see [v1.3.1][37] and [commits][38]
* [bmdixon][39], see [v1.3.1][40]
* [Izzy][41], see [v1.3.2][42] and [commits][43]

All the people who noted bugs and made suggestions in the comments and answers [on the Stack Apps page][44]!

  [1]: http://meta.stackoverflow.com/questions/74194/how-to-review-can-we-agree-on-a-review-policy
  [2]: http://i.stack.imgur.com/L3Cqp.png
  [3]: http://stackapps.com/questions/2116/pro-forma-comments-for-review-educating-users-before-flagging/2134#2134
  [4]: http://stackapps.com/a/3281/876
  [5]: http://i.stack.imgur.com/GjOkQm.png
  [6]: http://i.stack.imgur.com/GjOkQ.png
  [7]: https://github.com/Benjol/SE-AutoReviewComments/raw/master/dist/autoreviewcomments.user.js
  [8]: https://support.google.com/chrome_webstore/answer/2664769?p=crx_warning&rd=1
  [9]: http://stackapps.com/users/24114/derek
  [10]: https://chrome.google.com/webstore/detail/denkbaalahjlbbfnifkacdigaofcnogg
  [11]: http://stackapps.com/tags/script/info
  [12]: https://github.com/Benjol/SE-AutoReviewComments/blob/master/dist/autoreviewcomments.user.js
  [13]: http://stackapps.com/tags/script/info
  [14]: http://stackexchange.com/users/6711/benjol
  [15]: https://github.com/Benjol/SE-AutoReviewComments/releases
  [16]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=Benjol
  [17]: http://stackexchange.com/users/19908/tom-wijsman
  [18]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.0.8
  [19]: http://stackexchange.com/users/40051/balpha
  [20]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.1.0
  [21]: http://stackexchange.com/users/33230/sathya
  [22]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.0.6
  [23]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=SathyaBhat
  [24]: http://stackexchange.com/users/113304/thiefmaster
  [25]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.1
  [26]: http://stackexchange.com/users/95447/oliver-salzburg
  [27]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.3
  [28]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=oliversalzburg
  [29]: http://stackexchange.com/users/620/shog9
  [30]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.4
  [31]: http://stackexchange.com/users/239224/peehaa
  [32]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.9
  [33]: http://stackexchange.com/users/106573/derek
  [34]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.1
  [35]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=derek1906
  [36]: http://stackexchange.com/users/120635/caleb
  [37]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.1
  [38]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=alerque
  [39]: http://stackexchange.com/users/412603/bmdixon
  [40]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.1
  [41]: http://stackexchange.com/users/1540386/izzy
  [42]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.2
  [43]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=IzzySoft
  [44]: http://stackapps.com/q/2116

