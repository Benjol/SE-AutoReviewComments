> The project (besides the user script) is currently no longer maintained, sorry. </br>

<br/>
<div align="center">
  <h1 align="center">AutoReviewComments</h1>

  <p align="center">
    Pro-forma comments for Stack Exchange
    <br />
    <a href="https://github.com/Benjol/SE-AutoReviewComments/issues"><strong>Contribute now »</strong></a>
    <br />
    <br />
    <a href="http://stackapps.com/q/2116">StackApps.com</a>
    ·
    <a href="https://github.com/Benjol/SE-AutoReviewComments/graphs/contributors">Contributors</a>
    </br>
  </p>
</div>

### TOC

- [Introduction](#no-more-re-typing-the-same-comments-over-and-over)
- [Features](#features)
- [Installation](#installation)
    + [Mozilla Firefox](#mozilla-firefox)
    + [Google Chrome](#google-chrome)
    + [Opera](#opera)
    + [Other browsers, including Safari](#other-browsers-including-safari)
- [SOCVR Auto Comments](#so-close-vote-reviewers-auto-comments-listing)
- [Privacy policy](#privacy-policy)
- [Credits](#credits)


## No more re-typing the same comments over and over!

This script adds a little 'auto' link next to all comments boxes. When you click the link, you see a popup with customizable auto-comments (canned responses), which you can easily click to insert.

This script was inspired by answers to [this question on meta][1]. See also [here][2] for some history.

![Thumbnail][3]

## Features

1. **Read your comment before you post it!**

    Note that the dialog only *inserts* the text, it doesn't *send* the comment, nor does it flag anything; this is so that you can **check** the text before posting!

1. **Customize the texts**

    Simply [double click][4] on a comment text or description in order to customize it. Hit the 'reset' button if you screw up. This customization is currently **per-site**. Note that the "Welcome to `$SITENAME$`" text is automagically inserted if the user is 'new' (member for less than a week), so you don't *need* to add that to your custom text (but you can if you want to, see '9' below). 
    
    It is possible to target comments to specific use-cases (Answers, Questions, etc.) - see Import/export section below

    If you need more/less than the default 6 comments, just carry on reading...

1. **Quick user info**

    The dialog also includes a mini-summary of the user's activity (because if they haven't been back in months, there's no point writing them a comment).

1. **Automatic notification of new versions**

    The script will also **notify you if a newer version is created**.

1. **Import/export of custom comments**

    This helps with transferring custom comments between sites. The export/import 'format' is presented as markdown, so you can post it elsewhere, and let others benefit from your words of wisdom.

    Note that you can also use the Import to create an arbitrary number of comments (the default is 6). If there are too many, you can use the show/hide desc link to gain a bit of space.
    
    Title prefixes are allowed and permit a comment to be targeted to the associated dialogue (see point 7).     

1. **Remote source for comments**

    If you get bored with copy/pasting your comments between sites and/or computers, you can use the 'remote' button to define a remote source for your comment texts. See [here][5] for more details.

1. ***Differentiated comments for questions/answers***

    If you prefix your comment title with `[Q]`, it will be only displayed for questions, etc (see below). Non-prefixed comments are always displayed.

    - Closure : "C",
    - CommentQuestion : "Q",
    - CommentAnswer : "A",
    - EditSummaryAnswer : "EA",
    - EditSummaryQuestion : "EQ"
      
    The expected format for the title prefix (in the import/export dialogue) is: `###[Q] More than one question asked`

1. **`[type here]`, `[username]` & `[OP]` (& $MYUSERID$)**

    If the text `[type here]` is included in a comment, it will be automatically selected for completion when inserted. `[username]` will be replaced with the user's name (or just 'user' if nothing was found), and [OP] with the original poster's name (if found, else 'OP'). Also, $MYUSERID$ will be replaced with your user id for the current site.

1. **Customise welcome message**

    The default message is "Welcome to $SITENAME$" - which is shown for any 1-week-old users. By clicking on the 'welcome' link at the bottom of the popup, you can opt to change this message, or leave it empty to show no messages at all. You can also 'force' the message for older users on a one-off basis. This is per-site.

    [![Screenshot][6]][6]

## Installation

Add-ons are currently no longer maintaned. Use the [user script][9] with [Grease Monley][10] for the latest version.

#### Mozilla Firefox

The [Firefox add-on][7] is deprecated until further notice, because of breaking changes in their security requirements. If you want to take on the update, details are [here][8]. Pending that time, use the [user script][9] with [Grease Monkey][10].

#### Google Chrome

[Install the extension][11].

#### Opera

[Install the add-on][12].

#### Other browsers, including Safari

You can download the [user script][9] or [preview the code][13].

Here are some [useful browser-specific instructions][14] on getting it to work. For more information about user scripts, check out the [[tag:script] tag wiki][14].

## SO Close Vote Reviewers Auto Comments Listing

If you want to use the AutoReviewComments along with the collection of SO Close Vote Reviewers comments, you can refer to [SOCVR's Auto Comments repository][44]. Want to have your comments always be in sync with that repo? Follow the instructions at [socvr.org][45].

## Privacy policy
(Because Chrome store wants it)

We track nothing, we record nothing, we know nothing.

Everything happens in your browser.

## Credits

* [Benjol][15], see [all versions][16] and [commits][17]
* [Tom Wijsman][18], see [v1.0.8][19]
* [balpha][20], see [v1.1.0][21]
* [Sathya][22], see [v1.1.6][23] and [commits][24]
* [ThiefMaster][25], see [v1.2.1][26]
* [Oliver Salzburg][27], see [v1.2.3][28] and [commits][29]
* [Shog9][30], see [v1.2.4][31]
* [PeeHaa][32], see [v1.2.9][33]
* [Derek][34], see [v1.2.9][35] and [commits][36]
* [Caleb][37], see [v1.3.1][35] and [commits][38]
* [bmdixon][39], see [v1.3.1][35]
* [Izzy][40], see [v1.3.2][41] and [commits][42]

All the people who noted bugs and made suggestions in the comments and answers [on the Stack Apps page][43]!


  [1]: http://meta.stackoverflow.com/questions/74194/how-to-review-can-we-agree-on-a-review-policy
  [2]: http://stackapps.com/questions/2116/autoreviewcomments-pro-forma-comments-for-se
  [3]: http://i.stack.imgur.com/L3Cqp.png
  [4]: http://stackapps.com/questions/2116/pro-forma-comments-for-review-educating-users-before-flagging/2134#2134
  [5]: http://stackapps.com/a/3281/876
  [6]: http://i.stack.imgur.com/GjOkQm.png
  [7]: https://addons.mozilla.org/en-US/firefox/addon/se-autoreviewcomments
  [8]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx_to_jpm
  [9]: https://github.com/Benjol/SE-AutoReviewComments/raw/master/dist/autoreviewcomments.user.js
  [10]: https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/
  [11]: https://chrome.google.com/webstore/detail/autoreviewcomments/bcfoamnigomkoaaiceppbbdlembpeejc
  [12]: https://addons.opera.com/en/extensions/details/se-autoreviewcomments/
  [13]: https://github.com/Benjol/SE-AutoReviewComments/blob/master/dist/autoreviewcomments.user.js
  [14]: http://stackapps.com/tags/script/info
  [15]: http://stackexchange.com/users/6711/benjol
  [16]: https://github.com/Benjol/SE-AutoReviewComments/releases
  [17]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=Benjol
  [18]: http://stackexchange.com/users/19908/tom-wijsman
  [19]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.0.8
  [20]: http://stackexchange.com/users/40051/balpha
  [21]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.1.0
  [22]: http://stackexchange.com/users/33230/sathya
  [23]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.0.6
  [24]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=SathyaBhat
  [25]: http://stackexchange.com/users/113304/thiefmaster
  [26]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.1
  [27]: http://stackexchange.com/users/95447/oliver-salzburg
  [28]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.3
  [29]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=oliversalzburg
  [30]: http://stackexchange.com/users/620/shog9
  [31]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.4
  [32]: http://stackexchange.com/users/239224/peehaa
  [33]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.2.9
  [34]: http://stackexchange.com/users/106573/derek
  [35]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.1
  [36]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=derek1906
  [37]: http://stackexchange.com/users/120635/caleb
  [38]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=alerque
  [39]: http://stackexchange.com/users/412603/bmdixon
  [40]: http://stackexchange.com/users/1540386/izzy
  [41]: https://github.com/Benjol/SE-AutoReviewComments/releases/tag/v1.3.2
  [42]: https://github.com/Benjol/SE-AutoReviewComments/commits?author=IzzySoft
  [43]: http://stackapps.com/q/2116
  [44]: https://github.com/SO-Close-Vote-Reviewers/socvr.org/tree/main/comments
  [45]: https://socvr.org/tools.html
  
