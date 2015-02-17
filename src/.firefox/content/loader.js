/**
 * Copyright (C) 2013, Oliver Salzburg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Created: 2013-09-27 21:11
 *
 * @author Oliver Salzburg
 * @copyright Copyright (C) 2013, Oliver Salzburg
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

var AutoReviewComments = {
  init: function() {
    var appcontent = document.getElementById( "appcontent" );
    if( appcontent ) {
      appcontent.addEventListener( "DOMContentLoaded", AutoReviewComments.onPageLoad, true );
    }
  },

  onLoad: function( event ) {
    window.removeEventListener( "load", AutoReviewComments.onLoad, false );
    AutoReviewComments.init();
  },

  onUnLoad: function() {
    window.removeEventListener( "unload", AutoReviewComments.onUnLoad, false );
    window.document.getElementById( "appcontent" ).removeEventListener( "DOMContentLoaded",
                                                                        AutoReviewComments.onPageLoad, false );
  },

  onPageLoad: function( event ) {
    var unsafeWin = event.target.defaultView;
    if( unsafeWin.wrappedJSObject ) unsafeWin = unsafeWin.wrappedJSObject;

    var unsafeLoc = new XPCNativeWrapper( unsafeWin, "location" ).location;
    var href = new XPCNativeWrapper( unsafeLoc, "href" ).href;

    var targetSites = [
      "@ant-sites-string-list@"
    ];

    targetSites.forEach( function( site ) {
      site = site.replace( "http*", "(http|https)" );
      site = site.replace( "*", ".*?" );
      var siteRegexp = new RegExp( site );
      if( siteRegexp.test( href ) ) {
        setTimeout( function() {
          AutoReviewComments.injectScript( "autoreviewcomments-script",
                                          "chrome://autoreviewcomments-1f369631-31dd-43a8-8597-e159af817152/content/autoreviewcomments.js" );
        }, 100 );
      }
    } );
  },

  injectScript: function( id, src ) {
    var scriptTag = content.document.getElementById( id );
    if( !scriptTag ) {
      scriptTag = content.document.createElement( "script" );
      scriptTag.id = id;
      scriptTag.type = "text/javascript";
      scriptTag.src = src;

      var head = content.document.getElementsByTagName( "head" )[0];
      head.appendChild( scriptTag );
    }
  }
};

window.addEventListener( "load", AutoReviewComments.onLoad, false );
window.addEventListener( "unload", AutoReviewComments.onUnLoad, false );
