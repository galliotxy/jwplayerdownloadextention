/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-19
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
var pages = new Array();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        var information;
        information = request;
        if(information.purpose == "detect")
        {
            pages.push({pageUrl: information.pageUrl, title: information.title});
            chrome.tabs.create({
                url: information.pageUrl //,pinned: true
            },function(tab) {

            });

        }
        else if(information.purpose == "download")
        {

            for (i = 0;i<pages.length;i++)
            {
                if(pages[i].pageUrl == information.pageUrl)
                {
                    var title = pages[i].title;
                    var videoUrl = information.videoUrl;
                    pages.splice(i,1);
                    break;
                }
            }
            alert(title + ":" + videoUrl);
            // ...
        }
    });