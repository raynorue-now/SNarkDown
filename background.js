// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var previewMode = false;

/*
first attempt at a global preview variable, this sends data to the content script.
This is needed so as an "Extension" we can record one value to know what mode we're in, since the content_Script is cleared/runs on ever page refresh.

chrome.webNavigation.onCompleted.addListener(function() {
    console.log('on ServiceNow!');

    //send the initial preview mode value.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {previewMode: previewMode}, function(response) {
          console.log(response.farewell);
        });
      });
    
}, {url: [{hostSuffix : 'service-now.com'}]});
*/