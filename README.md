# AutoReviewComments
## Pro-forma comments for Stack Exchange

### No more re-typing the same comments over and over!

This script adds a little 'auto' link next to all comments boxes. When you click the link, you see a popup with 6 configurable auto-comments (canned responses), which you can easily click to insert.

This script was inspired by answers to [this question on meta][1].

![Thumbnail][2]

## Building
In case you want to build the script and/or browser extensions yourself. Please have a look at our [building instructions](https://github.com/Benjol/SE-AutoReviewComments/wiki/Building).

##Features

1. **Read your comment before you post it!**

    Note that the dialog only *inserts* the text, it doesn't *send* the comment, nor does it flag anything; this is so that you can **check** the text before posting!

1. **Customize the texts**

    Simply [double click][3] on a comment text or description in order to customize it. Hit the 'reset' button if you screw up. This customization is currently **per-site**. Note that the "Welcome to `$SITENAME$`" text is automagically inserted if the user is 'new' (member for less than a week), so you don't *need* to add that to your custom text (but you can if you want to, see '9' below). 

    If you need more/less than the default 6 comments, just carry on reading...

1. **Quick user info**

    The dialog also includes a mini-summary of the user's activity (because if they haven't been back in months, there's no point writing them a comment).

1. **Automatic notification of new versions**

    The script will also **notify you if a newer version is created**.

1. **Import/export of custom comments**

    This helps with transferring custom comments between sites. The export/import 'format' is also conveniently presented as markdown, so you can post it in an answer below, and let others benefit from your words of wisdom.

    Note that you can also use the Import to create an arbitrary number of comments (the default is 6). If there are too many, you can use the show/hide desc link to gain a bit of space.

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

Click [HERE][7] to install the user script. (**warning** Google is making things difficult for non-store user scripts. A workaround is explained [here][8]. Or use a script manager, like [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). **NEW** [Derek][9] has kindly uploaded the script into the [Chrome store][10].

For other browser-specific instructions, read the instructions [here][11])

Click [HERE][12] to preview the code.

For more information about user scripts, check out the [tag:script] tag wiki [here][13].


## Update info

(See comments and answers below for details)

**V1.3.3** - 'Service' release to correct the auto-update script (which was 'broken' by having changed script location). Also now supports updating the minified version of the script.

**V1.3.2** - New $MYUSERID$ placeholder from [Izzy][51], will be replaced with your user id for the current site. Also, under the covers this version contains all the scaffolding necessary for building browser extensions (hat-tip to Caleb and Oliver Salzburg who did all the heavy lifting)

**V1.3.1** - MOVED TO GITHUB! (With many thanks to [Izzy & Caleb][15]). Also now includes https (as requested by [bmdixon][16]). **From now on, please prefer reporting issues [directly in github][17]**

**V1.3.0** - Update to latest version of [API][18]. Correct bug in import which screwed things up if there was white space on 'empty' lines (reported [here][19] and [here][20])

**V1.2.9** - Fix for braking change (thanks SE devs!), suggested by [PeeHaa][21]. (Any other suggestions *not* including `setTimeout` are welcome!)

**V1.2.8** - Update to take advantage of new ['draggable dialogue'][22] functionality.

**V1.2.7** - Correct bug noted by [Oddthinking][23], and implement the 'force welcome' function requested by [Martin Scharrer][24].

**V1.2.6** - Implement [the][25] [much-requested][26] [override][27] for the new user Welcome message. Correct [a bug][28] with mangled markdown and [another][29] due to modified SE markup.

**V1.2.5** - Implement `[OP]` tag as [suggested][30] by [Gaffi][31]. 'Fix' for markdown/html conversion [bug][32] reported by [Madara Uchiha][33].

**V1.2.4** - Modify code to get script working in new Review (reported by [Oliver Salzburg][34]), hat-tip to [Shog9][35] for the fix.

**V1.2.3** - Slight modification to remote dialogue (details [here](http://stackapps.com/a/3281/876)). You can now use `[username]` as a wildcard (as suggested by [daviesgeek](http://stackapps.com/a/3473/876)). Corrected `&` bug noted by [Oliver Salzburg](http://stackapps.com/a/3474/876)

**V1.2.2** - Remote comment sources. Broadcasts. Read the details [here](http://stackapps.com/a/3281/876).

**V1.2.1** - update to work with 10k tools (suggested/implemented by [ThiefMaster][36])

**V1.2.0** - one fix (remove greeting before switching to edit mode), and one feature: hit Enter key to submit ([suggested by Bruno Pereira][37]). *Note that this isn't a major change, it's just my version comparison is string-wise, so V1.1.10 won't work*.

**V1.1.9** - fixed nasty javascript regex backreference replace bug (reported by [ThiefMaster][38]). For explanations see [here][39] and [here][40].

**V1.1.8** - fixed 'jQuery 1.7.1' bug, which stopped insert button being enabled. (No idea why it stopped working - though judging from [this][41], maybe it should never have worked, as I was using `attr("disabled", "")`)

**V1.1.7** - create pseudo categories for differentiating between comments for questions and comments for answers (suggested by [oers](http://stackapps.com/a/2692/876)) - simply prefix the comment *title* with `[Q]` or `[A]`

**V1.1.6** - make script work in `/admin/dashboard` (for moderators, requested/implemented by [Sathya](http://stackapps.com/users/74/sathya))

**V1.1.5** - make script work in `/review` (requested by [Gilles](http://stackapps.com/users/4259/gilles) (now uses jquery delegate for attaching events)

**V1.1.4** - if the text `[type here]` is included in a comment, it will be automatically selected for completion (requested by [daviesgeek](http://stackapps.com/users/8109/daviesgeek))

**V1.1.3** - include Registered/Unregistered in user info (requested by [waiwai933](http://stackapps.com/q/2582)).

**V1.1.2** - Fixed bug when using 'magic' links (reported by [Alex](http://stackapps.com/q/2500))

**V1.1.1** - If you have descriptions auto-hidden, the selected one will still be shown (suggested by [Alex](http://stackapps.com/q/2498)).

**V1.1.0** - bug fix. (SE's `full.js` is now delayed at load, so the `unbind('click')` was undoing my `click()` - fix from [@balpha][42]).

**V1.0.9** -  
- a) removed upgrading bits from previous version  
- b) added internal notification feature  
- c) now uses internal notification for announcing new versions 
- d) corrected the 'new versions announced once only' (it never worked AFAICT)  
- e) corrected the `$SITEURL$` escaping 'quirk'  
- f) stopped using `.owner` class for userinfo
- g) corrected bug which showed greeting twice.  

**V1.0.8** -  
- a) Mend see-through code.  
- b) Make storage more neighbour-friendly (add prefix, backwards compatible).  
- c) Allow variable number of custom comments (can only be modified via import).  
- d) Add show/hide description functionality. Add vertical scrollbars if too many comments.  
- e) Use 'selfupdatingscript' for update checks  
- f) Revert `$SITEURL$` to not contain the `http://`.  

**V1.0.7** - add an import/export function - can be used to transport custom comments between sites (note the use of `$SITEURL$` and `$SITENAME$` tags),

**V1.0.6** - changes to the list of included urls

**V1.0.5** - suppress warnings on new updates if already installed (previously each site would tell you about a new update, even if you'd already installed it)

**V1.0.4** - corrected two bugs in code detecting the appropriate userid to lookup

**V1.0.3** - corrected a bug in rep formatting. Integrated a function to poll once a day for new versions and notify user if any found.

**V1.0.2** - implemented customisation, using HTML5 storage to allow users to create/modify their own messages

**V1.0.1** - some refactoring, corrected a bug in the regex that converted html to markup.

## Note

Any comments welcome, whether on the functionality or the code.

Can be used in tandem with my [other user script](http://stackapps.com/questions/2069/change-unanswered-tab-to-review).

## Credits 

- [TomWij][43] ([below][44]) created a modified version of the script, which inspired my V1.0.8
- [balpha][45] came up with the clever (evil) way to make the script '[self-updating][46]'
- All the people who made suggestions in the comments and answers [here][50]!
- All the contributors here on github

## Known issues/Future plans

- The main future plan is to get this script adopted by SE. I like maintaining it, but some of the usability niggles (sharing across sites is still clunky, even with the remote option) can only be resolved centrally. (Vote [here][47] if you agree!)
- Modifying the script so that it also works in edit summary (as per [this request][48]), and the custom off-topic close reason (as per [this request][49]).
- Work is in progress to create (Firefox & Chrome) browser extensions for this script, whilst maintaining 'reverse compatibility' with a (minified) grease-monkey version.
- In future in should also be possible to create shared 'custom comments' on a per-site basis (useful for moderators & reviewers)


  [1]: http://meta.stackoverflow.com/questions/74194/how-to-review-can-we-agree-on-a-review-policy
  [2]: http://i.stack.imgur.com/L3Cqp.png
  [3]: http://stackapps.com/questions/2116/pro-forma-comments-for-review-educating-users-before-flagging/2134#2134
  [4]: http://stackapps.com/a/3281/876
  [5]: http://i.stack.imgur.com/GjOkQm.png
  [6]: http://i.stack.imgur.com/GjOkQ.png
  [7]: https://github.com/Benjol/SE-AutoReviewComments/raw/master/autoreviewcomments.user.js
  [8]: https://support.google.com/chrome_webstore/answer/2664769?p=crx_warning&rd=1
  [9]: http://stackapps.com/users/24114/derek
  [10]: https://chrome.google.com/webstore/detail/denkbaalahjlbbfnifkacdigaofcnogg
  [11]: http://stackapps.com/tags/script/info
  [12]: https://github.com/Benjol/SE-AutoReviewComments/blob/master/autoreviewcomments.user.js
  [13]: http://stackapps.com/tags/script/info
  [14]: http://stackapps.com/a/4359
  [15]: http://stackapps.com/a/4564/876
  [16]: http://stackapps.com/a/4565/876
  [17]: https://github.com/Benjol/SE-AutoReviewComments/issues/new
  [18]: http://blog.stackoverflow.com/2014/02/stack-exchange-api-v2-2-and-the-demise-of-v1-x/
  [19]: http://stackapps.com/a/4390
  [20]: http://stackapps.com/a/4332/876
  [21]: http://stackapps.com/a/4241
  [22]: http://meta.stackoverflow.com/a/166398
  [23]: http://stackapps.com/a/3887/876
  [24]: http://stackapps.com/a/3426/876
  [25]: http://stackapps.com/a/3317/876
  [26]: http://stackapps.com/a/3215/876
  [27]: http://stackapps.com/a/3235/876
  [28]: http://stackapps.com/a/3727/876
  [29]: http://stackapps.com/a/3866/876
  [30]: http://stackapps.com/a/3584/876
  [31]: http://stackapps.com/users/10417/gaffi
  [32]: http://stackapps.com/a/3727/876
  [33]: http://stackapps.com/users/9137/madara-uchiha
  [34]: http://stackapps.com/a/3540/876
  [35]: http://chat.meta.stackoverflow.com/transcript/message/1025260#1025260
  [36]: http://stackapps.com/a/3254/876
  [37]: http://stackapps.com/a/3249/876
  [38]: http://stackapps.com/a/3176/876
  [39]: http://www.regexguru.com/2010/06/replacement-text-syntax-for-javascripts-stringreplace/
  [40]: http://stackoverflow.com/questions/2466917/weird-javascript-regex-replace-backreference-behavior
  [41]: http://www.weba11y.com/Examples/disabledAttr.html
  [42]: http://stackapps.com/users/43/balpha
  [43]: http://stackapps.com/users/5631/tomwij
  [44]: http://stackapps.com/questions/2116/pro-forma-comments/2163#2163
  [45]: http://stackapps.com/users/43/balpha
  [46]: https://gist.github.com/874058
  [47]: http://meta.stackoverflow.com/questions/117963/formal-adoption-of-pro-forma-comments-script-into-se-engine-proper
  [48]: http://stackapps.com/a/2896/876
  [49]: http://stackapps.com/a/4235/876
  [50]: http://stackapps.com/q/2116
  [51]: http://stackexchange.com/users/1540386/izzy
