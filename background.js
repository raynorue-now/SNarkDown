// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.webNavigation.onCompleted.addListener(function() {
    console.log('on ServiceNow!');

    
}, {url: [{hostSuffix : 'service-now.com'}]});