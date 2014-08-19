/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-19
 * Time: 上午9:28
 * To change this template use File | Settings | File Templates.
 */
(function(){

    // 获取相册页面地址
    var pageUrl = window.location.href;

    // 获取相册页面标题
    var title = document.getElementsByTagName('title')[0].innerHTML;
    alert(title);

    // 获取视频Url
    //var videoUrl = document.getElementsByTagName('video').length;
    var videoPageUrl = document.getElementsByTagName('embed')[0].src;

    //var videoUrl = fetchVideoPage(videoPageUrl);
    alert(videoPageUrl);

    // 发送给background.js
    chrome.runtime.sendMessage({purpose:"detect",title: title, pageUrl: videoPageUrl},function(response){
        if (response == "denied")
        {

        }

    });
}());
