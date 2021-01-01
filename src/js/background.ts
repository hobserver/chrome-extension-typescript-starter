// chrome.contextMenus.create({title:"\u831c\u8363\u5b66\u4e60", onclick:function(info,tab){
//     window.open('https://fanyi.mlife.top');
// }});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type == "demo") {
        sendResponse('pupopValue');
    }
    return true;
});