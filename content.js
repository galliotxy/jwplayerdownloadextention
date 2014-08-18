/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 13-9-30
 * Time: 上午11:40
 * To change this template use File | Settings | File Templates.
 */
(function(DOMParser) {
    "use strict";

    var
        DOMParser_proto = DOMParser.prototype
        , real_parseFromString = DOMParser_proto.parseFromString
        ;

    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}

    DOMParser_proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var
                doc = document.implementation.createHTMLDocument("")
                ;
            if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                doc.documentElement.innerHTML = markup;
            }
            else {
                doc.body.innerHTML = markup;
            }
            return doc;
        } else {
            return real_parseFromString.apply(this, arguments);
        }
    };
}(DOMParser));

function fetchVideoPage(link) {
    //alert("fetchImgPage(firstImgLink)");
    var request = new XMLHttpRequest();

    request.open("GET", link, false);

    request.send(null);
    var parser = new DOMParser();
    var doc = parser.parseFromString(request.responseText, "text/html");


    // 空白页错误
    if(doc.getElementsByTagName('video') == null)
    {
        return "No video detected!";
    }
    if(doc.getElementsByTagName('video').src == null)
    {
        //doc.getElementById('closeb').click;
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        document.getElementById('closeb').dispatchEvent(evt);
        document.getElementById('player_display').click();
        //document.getElementsByTagName('video')[0].load();
    }


    var videoUrl = doc.getElementsByTagName('video')[0].src;
    return videoUrl;

}

(function(){

    // 获取相册页面地址
    var pageUrl = window.location.href;

    // 获取相册页面标题
    var title = document.getElementsByTagName('title')[0].innerHTML;
    alert(title)

    // 获取视频Url
    //var videoUrl = document.getElementsByTagName('video').length;
    var videoPageUrl = document.getElementsByTagName('embed')[0].src;

    var videoUrl = fetchVideoPage(videoPageUrl);
    alert(videoUrl)
}());
