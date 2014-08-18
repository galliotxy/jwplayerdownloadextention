/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 13-9-30
 * Time: 上午11:35
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

function delay(){
    var time = 800;
    var x = 0;
    for(var i = 0; i <= time; i++)
        for(var j = 0; j <= time; j++)
            for(var k = 0; k <= time; k++)
            {
                x = x + 1;
            };
    return x;
}

function getFirstImgLink(){
    var allImgLink = document.getElementById('gh').childNodes;
    var firstImgLink = allImgLink[1].firstChild.href;
    return firstImgLink;
    //alert(firstImgLink)
}


function fetchImgPage(link) {
    //alert("fetchImgPage(firstImgLink)");
    var request = new XMLHttpRequest();

    request.open("GET", link, false);

    request.send(null);
    var parser = new DOMParser();
    var doc = parser.parseFromString(request.responseText, "text/html");


    // 空白页错误
    if(doc.getElementById('sm') == null || doc.getElementById('sd') == null)
    {

        return "blank error";
    }
    var information = new Object();

    information.thisImgUrl = doc.getElementById('sm').src;
    information.nextImgLink = doc.getElementById('sd').childNodes[1].href;
    information.finalFlag = !(doc.getElementById('ia').childNodes[3].innerHTML == "Next Page &gt;" || doc.getElementById('ia').childNodes[5].innerHTML == "Next Page &gt;");

    // 509错误
    if(information.thisImgUrl == "http://ehgt.org/g/509.gif")
    {
        return "509 error";
    }

    return information;
}

function saveLocalStorage(galleryUrl,thisImgLink, nextImgLink, vectorImgUrl, picCount)
{
    //存储目前为止获取的url到storage
    var temp = new Object();
    temp.thisImgLink = thisImgLink;
    temp.nextImgLink = nextImgLink;
    temp.vectorImgUrl = vectorImgUrl;
    temp.picCountStart = picCount + 1;
    var objStr=JSON.stringify(temp); //localStorage只能存字符串。。。所以要转化成json字符串
    localStorage.setItem(galleryUrl, objStr);
}

function getAll(galleryInformation, thisImgLink, picCount, fetchCount, vectorImgUrl)
{
    var information = fetchImgPage(thisImgLink);
    var nextImgLink = "";
    if(information == "509 error")
    {
        alert("509 ERROR!");
        return;
    }
    else if(information == "blank error")
    {
        nextImgLink = thisImgLink;
        fetchCount++;
        if(fetchCount > 10)
        {
            alert("BLANK ERROR!");
            return;
        }
    }
    else if((picCount > 0 && vectorImgUrl[picCount - 1] == information.thisImgUrl) && information.finalFlag && information.nextImgLink == thisImgLink)  // 不知能否改为link一致
    {
        //console.log(information.finalFlag);
        console.log("ALL URL HAVE BEEN GETTED, SUCCESSFULLY SENT TO BACKGROUND!");
        //向background.js传递相册信息
        chrome.runtime.sendMessage({purpose:"download",
                vectorImgUrl: vectorImgUrl,
                imageNum: picCount,
                firstTitle: galleryInformation.firstTitle,
                secondTitle: galleryInformation.secondTitle,
                title: galleryInformation.title,
                galleryUrl: galleryInformation.galleryUrl},

            function(response){
                console.log(response);
            });
        return;
    }
    else
    {

        vectorImgUrl[picCount] = information.thisImgUrl;

        console.log("当前张数",picCount+1,"url",information.thisImgUrl);
        console.log("page", thisImgLink);
        console.log("finalFlag: " + information.finalFlag);

        saveLocalStorage(galleryInformation.galleryUrl, thisImgLink, information.nextImgLink, vectorImgUrl, picCount);
        picCount++;
        fetchCount = 0;
        nextImgLink = information.nextImgLink;

    }

    setTimeout(function(){getAll(galleryInformation, nextImgLink, picCount, fetchCount, vectorImgUrl);}, 2000);

}

function loadStorage(galleryInformation)
{
    if(localStorage.getItem(galleryInformation.galleryUrl))
    {

        var objStr=localStorage.getItem(galleryInformation.galleryUrl);
        //alert(1)
        var temp = JSON.parse(objStr);
        //alert(2)
        return temp;

    }
    return "no localStorage"
}

(function(){

    var galleryInformation = new Object();

    //获取相册页面地址，用于写入书签
    galleryInformation.galleryUrl = window.location.href;

    //获取相册页面标题，用于书签分析与记录
    galleryInformation.title = document.getElementsByTagName('title')[0].innerHTML;

    //获取主标题
    galleryInformation.firstTitle = document.getElementById('gn').innerHTML;

    //获取副标题
    galleryInformation.secondTitle = ""
    //secondTitle = document.getElementById('gj').innerHTML;
    alert(galleryInformation.firstTitle + "--" + galleryInformation.secondTitle);

    //找到指向第一张图的链接
    var thisImgLink = getFirstImgLink();

    //通过第一张图的页面顺次进入所有图的页面，记录每张图的url存入vectorImgUrl

    var vectorImgUrl = new Array();

    //检测localStorage中有无该相册的存储的temp记录，若有则修改thisImgLink、iStart、vectorImgUrl
    var picCountStart = 0;

    var temp = loadStorage(galleryInformation);
    if(temp != "no localStorage")
    {
        thisImgLink = temp.nextImgLink;
        picCountStart = temp.picCountStart;
        vectorImgUrl = temp.vectorImgUrl;
        alert("HAS ALREADY SAVED URLS FOR" + picCountStart + " IMAGES");
    }

    getAll(galleryInformation, thisImgLink, picCountStart, 0, vectorImgUrl);


}());
