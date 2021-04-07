# Star Fleet Tours Website

*Copyright © 2019-2021 Star Fleet Tours*

This repo is the source for the Star Fleet Tours [website](https://www.star-fleet.tours/).
It is built using [Lektor](https://www.getlektor.com/), previewed via Netlify, deployed via Github Actions CI, served by [Github Pages](https://pages.github.com/), and hosted on a custom domain.

Created and maintained by [C.A.M. Gerlach](https://github.com/CAM-Gerlach), [Steven Giraldo](https://github.com/Stevengrm) and [Evan Courey](https://github.com/EvanDotPro), the founders and organizers of Star Fleet Tours, with invaluable help from the Star Fleet community.
Enjoy!



## Usage

You can view it live on the web, built by Github Actions in real-time from the latest version of the theme, at the link in the repo description, or build it locally by cloning the repo ``lektor-icon`` repo and running ``lektor server`` in the ``star-fleet-tours-website`` directory (ensure you're using a version of Lektor >=3.1 for theme support).
The theme has full support for configuration either via the ``contents.lr`` source files, or the Lektor web GUI.



## Contributing

Content contributions and bug fixes/improvements are welcome!
If the latter, we generally recommend aside from trivial patches that you open an issue with your suggested changes before submitting a PR so that feedback can be solicited early in the process and we can properly document everything.
Check out the [Contributing Guide](https://github.com/star-fleet-tours/star-fleet-tours-website/blob/master/CONTRIBUTING.md) for more details, code and style standards, and more.
Thanks!



## License

The content of this site as a whole, excluding photographs, is released under the [Creative Commons Attribution Share-Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC-BY-SA 4.0) license or any later version, meaning (in brief) any re-use of identical, modified or derived versions of significant portions of the text and design must be credited with a the name of and a link to Star Fleet Tours (Attribution), and either released under that same license, or one explicitly declared to be compatible with it ("Share Alike"), which we extend to also include any earlier or later version of the same license.

The underlying theme, [Lektor-Icon](https://spyder-ide.github.io/lektor-icon/), and any executable code (excluding markup and stylesheets) is released under the terms of the [MIT (Expat) license](https://opensource.org/licenses/MIT), components of the latter of which may also have other permissive licenses apply.
See the Lektor-Icon [license](https://github.com/spyder-ide/lektor-icon/blob/master/LICENSE.txt) and [Notices](https://github.com/spyder-ide/lektor-icon/blob/master/NOTICE.txt) for more details.
Photos and graphics created or commissioned by us are released under the CC-BY-SA 4.0, while those created by others are used with permission and may be covered by other licenses.
See the [LICENSE.txt](https://github.com/star-fleet-tours/star-fleet-tours-website/blob/master/LICENSE.txt) in the root of the repository for the full text of the CC-BY-SA 4.0.


## Launch countdown override

The landing page and the tickets page can both display a countdown to an upcoming launch. This defaults to automatically retrieving and display the next SpaceX launch from Florida as appropriate. If you need to do something different, edit `assets/static/js/custom-scripts.js` to specify a `missionOverride`:

```javascript
const missionOverride = {
    missionName: "Spacecow",
    launchAt: 1234567890 // the UNIX timestamp of the projected T-0 time
};
```

The countdowns display only if the mission is in the near future. To prevent countdown display entirely, specify a mission override with `launchAt: 0`.
