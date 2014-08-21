/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-19
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
var pages = new Array();
function modifyName(title)
{
    while(title.indexOf(".") > -1){
        //alert("PATHNAME NEED MODIFICATION");
        title = title.replace(".","");
    }
    return title
}

function saveAs(name, url) {
    var save_link = document.createElement("a");
    save_link.href = url;
    save_link.download = modifyName(name);
    save_link.click();
    document.removeChild(save_link);
    /* var event = document.createEvent('MouseEvents');
     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
     save_link.dispatchEvent(event);
     webkitURL.revokeObjectURL(url);*/
}


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
                chrome.tabs.executeScript(tab.id, {file: "contentRemoveAdds.js"});

            });

        }
        else if(information.purpose == "download")
        {
            var title = "";
            var videoUrl = "";
            for (i = 0;i<pages.length;i++)
            {
                if(pages[i].pageUrl == information.pageUrl)
                {
                    title = pages[i].title;
                    videoUrl = information.videoUrl;
                    pages.splice(i,1);
                    break;
                }
            }
            if(title == "" || videoUrl == "")
            {
                alert("Error: No page information stored");
                return;
            }
            alert(title + ":" + videoUrl);
            saveAs(title, videoUrl);
            // ...
        }
    });