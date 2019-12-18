
(function () {

    createAndAppend('script', 'imports/simpleMDE.js');
    //createAndAppend('style', 'SNarkdown.css');
    createAndAppend('script', 'imports/turndown.js');
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            createAndAppend('script', 'SNarkdown.js');
        }
      };
    


    function createAndAppend(elemName, fileName) {
        var s = document.createElement(elemName);
        s.src = chrome.runtime.getURL(fileName);
        (document.head || document.documentElement).appendChild(s);
    }

})();

/*
first attempt and enabling a global preview mode, issue here is that g_form is undefined... but otherwise did we wanted..
the benefit of using g_form on the page, is that it will make the HTML fields "embedded" (rendering their HTML appropriately)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request.previewMode);

        sendResponse({
            farewell: "goodbye"
        });
        setTimeout(function () {
            togglePreviewMode();
        }, 300);

        function togglePreviewMode() {
            //previewMode = !previewMode;
            var textAreas = document.getElementsByTagName('textarea');
            for (let i = 0; i < textAreas.length; i++) {
                let textArea = textAreas[i];
                console.log('textArea: ', textArea);
                if (textArea.id.indexOf('.simpleMDE') > -1) {
                    textArea.style.display = request.previewMode ? 'none' : 'block';
                    var snField = textArea.id.split('.')[1];
                    var snElem = textArea.id.replace('.simpleMDE', '');
                    g_form.setReadOnly(snField, request.previewMode);
                    var tinyMCE = document.getElementById('element.' + snElem).getElementsByClassName('mce-tinymce mce-container mce-panel')[0];
                    tinyMCE.style.display = request.previewMode ? 'none' : 'block';
                    //hide this element and show and make readOnly it's original element
                }
            }
        }
    });
    */