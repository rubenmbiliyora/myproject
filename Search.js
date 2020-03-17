/* 
Copyright: Ray Wang
Released under the MIT/BSD licence which means you can do anything you want 
with it, as long as you keep this copyright notice on the page,this version only supports IE. 
*/
function searchContentByKeyWords(keyword) {
    if (document.createRange) {
        var range = document.createRange();
    }
    else
        var range = document.body.createTextRange();
    if (range.findText) {
        while (range.findText(keyword)) {
            range.pasteHTML("<SPAN style='background-color:yellow;'>" + range.text.fontcolor('#ff0000') + "</SPAN>");
            range.collapse(true);
        }
        findString(true, keyword);
    } else {
        var s, n;
        s = window.getSelection();
        while (window.find(keyword)) {
            var n = document.createElement("SPAN");
            n.style.color = "#ff0000";
            n.style.backgroundColor = "yellow";
            s.getRangeAt(0).surroundContents(n);
        }
    }
}
var TRange = null;
var oldkeyword = "";
var noresults = "";
function findString(flg,keyword) {
    var str = keyword;
    if (str == null || str.length == 0) {
        return;
    }
    TRange = document.body.createTextRange();
    oldkeyword = str;
    if (parseInt(navigator.appVersion) < 4) return;
    var isFound;
    if (navigator.appName.indexOf("Microsoft") != -1) {
        if (TRange != null) {
            if (flg) {
                TRange.collapse(false);
                isFound = TRange.findText(str);
                if (isFound)
                 {
                    TRange.select();
                 }
            } else {
                TRange.collapse(true);
                isFound = TRange.findText(str, -1, 1);
                if (isFound) {
                    TRange.select();
                    TRange.collapse(true);
                }
            }
        }
        if (TRange == null || isFound == 0) {
            TRange = document.body.createTextRange();
            if (flg) {
                isFound = TRange.findText(str);
            } else { isFound = TRange.findText(str, -1, 1); }
            if (isFound) {
                TRange.select();
            }
        }
    }
}
function findMatchWordsByKeyWord(keyword) {
    if (keyword != null) {
        findString(true, keyword);
    }
}