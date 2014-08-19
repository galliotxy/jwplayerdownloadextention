function download() {
    chrome.tabs.executeScript(null, {file: "contentDownload.js"});

}
function detect() {

    chrome.tabs.executeScript(null, {file: "contentDetect.js"});
}

function TestClick(){
    //chrome.tabs.executeScript(null, {file: "content.js"});
}

$(document).ready(function() {

    $('#test').click(TestClick);
    $('#detect').click(detect);
    $('#download').click(download);
    $('#goto').click(function() {
        chrome.tabs.create({
            url: "http://cl.man.lv/index.php" //,pinned: true
        });
    });

});
