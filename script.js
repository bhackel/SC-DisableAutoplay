// ==UserScript==
// @name         soundcloud disable autoplay station
// @version      1.1
// @description  Opens the Soundcloud Next Up menu and turns off the Autoplay Station on load, then continually disables it
// @author       bhackel
// @match        https://soundcloud.com/*
// @grant        none
// @run-at       document-start
// @noframes
// @namespace https://greasyfork.org/en/users/324178-bhackel
// ==/UserScript==

(function() {
    'use strict';

    function openQueue() {
        // opens the Next Up Queue to load the Autoplay button
        var queueTrigger = document.getElementsByClassName("playbackSoundBadge__queueCircle").item(0);
        if (queueTrigger) {
            // check if next up button is loaded, then open it and call to close it
            queueTrigger.click();
            closeQueue(queueTrigger);
        } else {
            // perform another check after delay
            setTimeout(openQueue, 500);
        }
    }

    function closeQueue(queueTrigger) {
        // closes the Next Up queue once the Autoplay button has loaded
        var buttonDiv = document.getElementsByClassName("queueFallback__toggle").item(0);
        if (buttonDiv) {
            // check if the button has loaded, then close the queue and call the loop
            queueTrigger.click();
            disableButtonLoop();
        } else {
            // perform another check after delay
            setTimeout(function() { closeQueue(queueTrigger); }, 500);
        }
    }

    function disableButtonLoop() {
        // repeatedly tries to turn off the Autoplay button
        var buttonDiv = document.getElementsByClassName("queueFallback__toggle").item(0);
        if (buttonDiv) {
            // make sure it exists to not error
            var button = buttonDiv.children.item(0);
            if (button.className === "toggle sc-toggle sc-toggle-active") {
                // it has this classname when Autoplay is enabled
                button.click();
            }
        }
        setTimeout(disableButtonLoop, 2000);
    }

    openQueue();
})();
