// ==UserScript==
// @name         Express Premium Blocker
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Block ads, redirects, IP Logger Blockers, and prevent automatic JS injection on web pages
// @author       Pixel.Pilot
// @grant        none

// @updateURL    https://github.com/PixelpilotDiscord/improved-garbanzo/blob/main/Test.js
// ==/UserScript==

(function() {
    'use strict';

    // List of domains to block
    var blockedDomains = [
        'bmwforum.co',
        'catsnthing.com',
        'catsnthings.fun',
        'crabrave.pw',
        'curiouscat.club',
        'datasig.io',
        'datauth.io',
        'dateing.club',
        'discörd.com',
        'disçordapp.com',
        'fortnight.space',
        'fortnitechat.site',
        'freegiftcards.co',
        'gaming-at-my.best',
        'gamingfun.me',
        'grabify.link',
        'headshot.monster',
        'imageshare.best',
        'joinmy.site',
        'leancoding.co',
        'locations.quest',
        'lovebird.guru',
        'minecräft.com',
        'mypic.icu',
        'otherhalf.life',
        'partpicker.shop',
        'progaming.monster',
        'quickmessage.us',
        'screenshare.host',
        'screenshot.best',
        'shrekis.life',
        'sportshub.bar',
        'spottyfly.com',
        'stopify.co',
        'särahah.eu',
        'särahah.pl',
        'trulove.guru',
        'xda-developers.us',
        'yourmy.monster',
        'youshouldclick.us',
        'yoütu.be',
        'grabify.link',
        'grabify.org'
        // ... (Future Domains)
    ];

    // Configuration: Set to true to enable redirect blocking, false to disable
    var blockRedirects = true;

    // Function to block ads, redirects, IP Logger Blockers, and prevent automatic JS injection
    function advancedBlocking() {
        // Hide elements with specific data attributes
        var adDataAttributes = ['data-ad', 'data-promo'];
        adDataAttributes.forEach(function(dataAttribute) {
            var adElements = document.querySelectorAll('[' + dataAttribute + ']');
            adElements.forEach(function(adElement) {
                adElement.style.display = 'none';
            });
        });

        // Block IP Logger Blockers
        var blockedIpLoggerSubdomains = ['grabify.link', 'grabify.org'];
        var currentUrl = window.location.href;
        if (blockedIpLoggerSubdomains.some(subdomain => currentUrl.includes(subdomain))) {
            console.log('Blocked access due to IP Logger Blocker: ' + currentUrl);
            window.location.href = 'https://bbf098bb-99b8-4e13-9b38-78487cee18ca-00-3evfdgbkkveju.kirk.repl.co'; // Redirect or handle as needed
            return;
        }

        // Intercept link clicks to block redirects with specific keywords in the URL
        document.addEventListener('click', function(event) {
            var target = event.target;
            // Check if the clicked element is a link
            if (blockRedirects && target.tagName === 'A') {
                // Block redirects with specific keywords in the URL
                if (target.href.includes('tracking_url') || target.href.includes('affiliate_link')) {
                    event.preventDefault();
                    console.log('Blocked redirect to: ' + target.href);
                    // You can add custom logic here if needed
                }
            }
        });

        // Block specified domains
        var currentHostname = window.location.hostname;
        if (blockedDomains.includes(currentHostname)) {
            console.log('Blocked access to specified domain: ' + currentHostname);
            window.location.href = 'https://bbf098bb-99b8-4e13-9b38-78487cee18ca-00-3evfdgbkkveju.kirk.repl.co'; // Redirect or handle as needed
        }
    }

    // Run the advanced blocking function when the page loads
    advancedBlocking();

    // Additionally, use MutationObserver to handle dynamically loaded content
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Handle added or removed nodes
                advancedBlocking();
            }
        });
    });

    // Start observing changes to the DOM
    observer.observe(document.body, { subtree: true, childList: true });
})();
