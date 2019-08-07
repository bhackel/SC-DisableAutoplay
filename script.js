// ==UserScript==
// @name         soundcloud disable autoplay station
// @version      1.0
// @description  Opens the Soundcloud Next Up menu and turns off the Autoplay Station on load
// @author       bhackel
// @match        https://soundcloud.com/*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    function disableButton() {
        // turns off the autoplay station button
        var buttonDiv = document.getElementsByClassName("queueFallback__toggle").item(0);
        if (buttonDiv) {
            // check if autoplay station switch has loaded, then change its class to 'off' state
            var button = buttonDiv.children.item(0);
            button.className = "toggle sc-toggle";
            toggleQueue(false);
        } else {
            // continue running until element is loaded
            setTimeout(disableButton, 500);
        }
    }

    function toggleQueue(first) {
        // clicks to open/close the 'next up' menu
        var queueTrigger = document.getElementsByClassName("playbackSoundBadge__queueCircle").item(0);
        if (queueTrigger) {
            // check if 'next up' button has loaded, then click it
            queueTrigger.click()
            if (first) {
                disableButton();
            }
        } else {
            // continue running until element is loaded
            setTimeout(function(){ toggleQueue(first); }, 500);
        }
    }

    toggleQueue(true);
})();
