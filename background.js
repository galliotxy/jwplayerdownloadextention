/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-19
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        var information;
        information = request;
        if(information.purpose == "detect")
        {
            chrome.tabs.create({
                url: information.pageUrl //,pinned: true
            },function(tab) {

            });

        }
        else if(information.purpose == "download")
        {

        }
    });