/*
Star Fleet Tours Website
Copyright (c) 2019- Star Fleet Tours

Code released under the terms of the MIT (Expat) License:
https://opensource.org/licenses/MIT
*/


;(function () {

    'use strict';

    // We can retrieve the upcoming SpaceX launch from an unofficial API and display it
    // automatically. If you want to override this behavior, specify a missionOverride here:
    //
    // const missionOverride = {
        // missionName: "SpaceX NASA Crew-2",
        // launchAt: 1588809600 // the UNIX timestamp of the projected T-0 time
    // };
    //
    // Otherwise, specify the absence of a missionOverride:
    const missionOverride = {
        missionName: "Ultimate Delta IV Heavy NROL-70",
        launchAt: 1712681580, // the UNIX timestamp of the projected T-0 time
        limitTwoWeeks: true,
    };
    // const missionOverride = null;

    // Style all "star" symbols
    var styleStarGlyph = function() {
        $('body:contains("\u2726")').contents().each(function () {
            if (this.nodeType == 1) {
                $(this).html(function (_, oldValue) {
                    return oldValue.replace(/\u2726/g, "<span class='themed-text'>$&</span>")
                })
            }
        })
    };

    // Display a launch countdown in the hero section of the main page, if appropriate.
    function initializeLaunchCountdown() {
        const hero = $(".hero-section#section-home")[0];
        const pageBodyCountdownContainer = document.getElementById("page-body-countdown-container");
        if (!hero && !pageBodyCountdownContainer) {
            // We have nowhere to put the countdown
            return;
        }

        if (missionOverride === null) {
            fetchAndDisplaySpacexLaunchCountdown({hero, pageBodyCountdownContainer});
        } else {
            const {missionName, launchAt, limitTwoWeeks} = missionOverride;
            displayLaunchCountdown({hero, pageBodyCountdownContainer, missionName, launchAt, limitTwoWeeks});
        }
    }

    function fetchAndDisplaySpacexLaunchCountdown({hero, pageBodyCountdownContainer}) {
        function flightLaunchesFromFlorida(flight) {
            return ["ksc_lc_39a", "ccafs_slc_40"].includes(flight.launch_site.site_id);
        }

        // List the upcoming launches:
        //   https://docs.spacexdata.com/?version=latest#e001c501-9c09-4703-9e29-f91fbbf8db7c
        //   https://github.com/r-spacex/SpaceX-API
        fetch("https://api.spacexdata.com/v3/launches/upcoming?limit=5&sort_by=launch_date_utc")
            // Parse the response
            .then((resp) => resp.json())
            // Pick the first flight launching from Florida
            .then((flights) => flights.filter(flightLaunchesFromFlorida)[0])
            .then((flight) => {
                // Do nothing if there is no upcoming launch
                if (flight === null) {
                    return;
                }

                // Fish out some attributes
                const missionName = flight.mission_name;
                const launchAt = flight.launch_date_unix;
                const limitTwoWeeks = true;

                displayLaunchCountdown({hero, pageBodyCountdownContainer, missionName, launchAt, limitTwoWeeks});
            });
        // N.B.: the lack of error handling is intentional
        // This countdown is a nice-to-have, and not a reason to attract attention on failure
    }

    function displayLaunchCountdown({hero, pageBodyCountdownContainer, missionName, launchAt, limitTwoWeeks}) {
        // How far in the future is this launch?
        const now = (new Date()).getTime() / 1000;
        if (now < launchAt - 14 * 86400 && limitTwoWeeks) {
            // More than two weeks to go
            // Countdowns this far out aren't exciting, so do nothing
            return;
        } else if (now > launchAt) {
            // This "upcoming" launch already happened?
            // Either the data is wrong or the user has a bad clock, so do nothing
            return;
        }

        // Launch is reasonably imminent
        // Display the launch countdown

        // Make some DOM elements
        let countdownContainerDiv;
        if (hero) {
            countdownContainerDiv = document.createElement("div");
            countdownContainerDiv.className = "hero-countdown-container";
        } else {
            countdownContainerDiv = pageBodyCountdownContainer;
        }

        const countdownDiv = document.createElement("div");
        countdownDiv.className = "launch-countdown";
        countdownContainerDiv.appendChild(countdownDiv);

        const missionNameHeading = document.createElement("h3");
        missionNameHeading.className = "launch-countdown-mission-name";
        missionNameHeading.innerText = missionName + ":";
        countdownDiv.appendChild(missionNameHeading);

        const countdownClockHeading = document.createElement("h3");
        countdownClockHeading.className = "launch-countdown-clock";
        countdownDiv.appendChild(countdownClockHeading);

        let interval = null;

        function tick() {
            const now = Math.floor((new Date()).getTime() / 1000);
            const delta = launchAt - now;
            if (delta < 0) {
                // Stop counting, and remove the countdown
                clearInterval(interval);
                countdownContainerDiv.parent.removeChild(countdownContainerDiv);
                return;
            }

            const days = Math.floor(delta / (24 * 3600));
            const hours = Math.floor(delta % (24 * 3600) / 3600);
            const minutes = Math.floor((delta % 3600) / 60);
            const seconds = delta % 60;
            countdownClockHeading.innerText = [
                days.toString().padStart(2, "0"),
                hours.toString().padStart(2, "0"),
                minutes.toString().padStart(2, "0"),
                seconds.toString().padStart(2, "0"),
            ].join(":");
        }
        interval = setInterval(tick, 100);
        tick();

        if (hero) {
            // Attach our elements to the page
            hero.appendChild(countdownContainerDiv);
        }
    }

    // Document on load
    $(function(){
        styleStarGlyph();
        initializeLaunchCountdown();
    });

}());
