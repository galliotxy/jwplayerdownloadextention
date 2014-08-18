function download() {
    chrome.tabs.executeScript(null, {file: "content.js"});
}

function TestClick(){
    //chrome.tabs.executeScript(null, {file: "content.js"});
}

$(document).ready(function() {

    $('#test').click(TestClick);
    $('#download').click(download);

});
