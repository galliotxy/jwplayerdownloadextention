/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-19
 * Time: 上午9:54
 * To change this template use File | Settings | File Templates.
 */


(function(){

    // 获取相册页面地址
    var pageUrl = window.location.href;

    // 获取相册页面标题
    var title = document.getElementsByTagName('title')[0].innerHTML;
    alert(title)

    // 获取视频Url
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    document.getElementById('closeb').dispatchEvent(evt);
    document.getElementById('player_display').click();

    var videoUrl = document.getElementsByName('video').src;
    alert(videoUrl)
}());