  (function () {


    //==== handle exit cases ====

    //if for some reason we do not have g_form. Nothing to do!
    if (typeof g_form == 'undefined') {
      return;
    }

    /*
    if(SNarkdown.previewMode){
      console.log('in preview mode for SNarkdown!');
      return; //do not do anything..
    }
    */

    // @todo: If someone purposefully "Pauses" the extension, this way they can just have the OOB Wysiwigs
    var paused = false;
    if (paused) {
      return;
    }

    //get editable fields
    let formFields = g_form.getEditableFields();
    let hasValues = [];
    for (let i = 0; i < formFields.length; i++) {

      let elem = g_form.getElement(formFields[i]);

      if (elem.id.indexOf('activity-stream') > -1 || !elem.id || elem.id.indexOf('simpleMDE') > -1) {
        continue;
      }

      if (!elem.getAttribute('config')) {
        continue; //not a TincyMCE element.
      }
      if (elem.type == 'textarea') {

        var hadMDEValue = convertToMarkDown(elem);
        document.getElementById('element.' + elem.id).getElementsByClassName('mce-tinymce mce-container mce-panel')[0].style.display = 'none';
        /*
        if (g_form.getValue(formFields[i]) && !hadMDEValue) {
          hasValues.push(formFields[i]);
        } else {
          document.getElementById('element.' + elem.id).getElementsByClassName('mce-tinymce mce-container mce-panel')[0].style.display = 'none';
        }
        */
      }

    }
    /*
        if (hasValues.length > 0) {
          alert('The following fields had existing values.\n\n' + hasValues.join('\n') + '\n\n.Be sure to copy/paste into MDE!');
        }
        */
        var previewMode = false;
    function convertToMarkDown(elem) {
      // console.log('converting element: ', elem);
      var hadMDEValue = false;

      let textArea = document.createElement('textarea');
      textArea.setAttribute('class', 'form-control');
      textArea.setAttribute('id', elem.id + '.simpleMDE');
      elem.parentNode.appendChild(textArea);

      let options = {
        element: document.getElementById(elem.id + '.simpleMDE'),
        forceSync: true,
        renderingConfig: {
          codeSyntaxHighlighting: true
        },
        spellChecker: false,
        toolbar: [
          "bold", "italic", "strikethrough", "heading", "|", "code", "|", "quote", "unordered-list", "ordered-list", "|", "link",
          {
            name: "preview",
            action: function (editor) {
              var tinyMCE = document.getElementById('element.' + elem.id).getElementsByClassName('mce-tinymce mce-container mce-panel')[0];
              tinyMCE.style.display = tinyMCE.style.display == 'none' ? 'block' : 'none';
              console.log('preview: ', elem);
              g_form.setReadOnly(elem.id.split('.')[1] + '', true);
            },
            className: 'fa fa-eye',
            title: 'Toggle Preview'
          },
        ]
      };

      let mde = new SimpleMDE(options)
      var currentVal = g_form.getValue(elem.id);

      if (currentVal) {
        //console.log('Current value is: ', currentVal);
        var el = document.createElement('html');
        el.innerHTML = currentVal;
        var clssName = elem.id.replace(/\./g, '_') + '_simpleMDE_storage';
        //console.log('querySel');
        var storageElem = el.getElementsByClassName(clssName);
        //console.log('storageElem: ', storageElem);
        if (storageElem && storageElem.length > 0) {
          var storageStr = storageElem[0].innerHTML;
          if (storageStr.indexOf('{') === -1) {
            //assume we're base64encoded...
            storageStr = atob(storageStr);
          }
          if (storageStr.indexOf('{') === 0) {
            var storageData = JSON.parse(storageStr);
            if (storageData.markdown) {
              mde.value(storageData.markdown);
              hadMDEValue = true;
            }
          }
        } else {
          mde.value(new TurndownService().turndown(currentVal));
        }

      }


      mde.codemirror.on("change", function (test123) {
        let elem = test123.getTextArea();
        //console.log('field changed!', elem);
        let snFieldName = elem.id.replace('.simpleMDE', '');
        let HTML = mde.markdown(mde.value());
        HTML += '<span style="display:none" id="' + elem.id + '.storage" class="' + elem.id.replace(/\./g, '_') + '_storage">' + btoa(JSON.stringify({
          markdown: mde.value()
        })) + '</span>';
        //console.log('setting value for: ', g_form.getElement(snFieldName))
        g_form.setValue(snFieldName, HTML);
      })

      return hadMDEValue;
    }
  })();