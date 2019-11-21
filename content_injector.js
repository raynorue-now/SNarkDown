(function () {

    //createAndAppend('script', 'simpleMDE.js');
    //createAndAppend('style', 'SNarkdown.css');
    createAndAppend('script', 'imports/turndown.js');
    createAndAppend('script', 'SNarkdown.js');
    
    
    function createAndAppend(elemName, fileName){
    var s = document.createElement(elemName);
    s.src = chrome.runtime.getURL(fileName);
    (document.head || document.documentElement).appendChild(s);
    }

})();