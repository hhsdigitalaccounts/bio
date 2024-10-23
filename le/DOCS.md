# HHS Digital Signage

This is a small website with pages for the lobby digital signage. It can be viewed in a modern browser on all sorts of
devices, including not just the Chromebits mentioned below but also any device, such as a mobile phone.

This project is a reimplementation of
[the official HHSDigitalAccounts project](https://github.com/hhsdigitalaccounts/hhsdigitalaccounts.github.io/tree/master)
intended to improve code readability and maintainability, as well as to fix a few small bugs.

Below are two existing sources of documentation (written by Moose Reeve [@moosereeve](https://github.com/moosereeve)),
included here for the sake of documentation.

The first source is from a Google Doc. (I don't know more details; this is all I have access to as I am a student.)

> # Digital Signage (Hallway TVs)
>
> The hallway TVs use Chromebits, Google Slides, and a little HTML/Javascript to access the schedule and lunch Google
> Calendars.
>
> ## Editing the signage
>
> All of the following complexity (below) is so that it is easy for anyone to edit the signage using simple tools. The
> slideshow is simply this Google Slides doc (owner: HHSDigitalAccounts@holliston.k12.ma.us). Edit the doc and show/hide
> whichever slides are currently relevant. The TVs update their cache about once an hour.
> 
> To edit the schedules and lunches, edit the HHS Daily Schedules calendar or the HHS Lunch Menus calendar (the account
> HHSDigitalAccounts@holliston.k12.ma.us has access to these calendars). The menus are updated by the cafeteria
> director.
>
> ## Hardware
>
> Each of the TVs has a Chromebit attached to an HDMI jack. This Chromebit is a USB flash-drive-sized device that runs a
> full version of ChromeOS. It’s basically a Chromebook, without the keyboard, trackpad or screen. It connects to the
> school wifi. If you need to configure the hardware manually, you will need to attach a wireless keyboard/mouse doodad
> into its single USB port. Otherwise, it autoboots to the correct place, even after returning from a power loss.
> 
> ## Casting to the screen
>
> In the Google Admin console, there are three devices in the following OU: holliston.k12.ma.us > HPS Staff & Students >
> HHS > HHS Chrome Sign Builder. The devices are the Chromebits, and the Google Admin console has these devices
> auto-launch Chrome Sign Builder whenever they reboot.
> 
> Chrome Sign Builder is a Chrome app for just this purpose. It allows a schedule to be created and uploaded into the
> console. This is currently set to show the URL below 24/7:
> https://hhsdigitalaccounts.github.io/signage/hhs-signage.html
> 
> What’s that webpage? It’s a page I built that does three things:
> * Displays a Google Slides show on auto-run
> * Downloads and displays the schedules and lunches for the next two days
> * Make a red background and places the slideshow and schedule in place
> 
> The owner of the github account for that webpage/script is HHSDigitalAccounts@holliston.k12.ma.us.
>
> ## Bonus: Finalsite Webpage widgets
>
> There is a page on the HHS website called the Chromebook Launchpad. It is the default homepage for HHS Chromebooks.
> Along the left hand side of that page, scheduled and lunch menus appear. The widget showing this is ALSO kept in the
> GitHub repository, in the “final-site helpers” folder. It’s very similar to what appears on the TVs, but is formatted
> to match the style of the website.

The second documentation is adapted from the HHSDigitalAccounts GitHub.io repository's signage instructions
[here](https://github.com/hhsdigitalaccounts/hhsdigitalaccounts.github.io/blob/master/signage/signage%20instructions.rtf).

> # HHS Digital Signage Instructions
> 
> **Tom Reeve December 2018**
> 
> The digital signage is using Chrome Sign Builder to display the content. Sign Builder points to a default URL, but can
> also display other URLs as needed. 
> 
> Each TV has a Chromebit mini-computer plugged into its HDMI port. They are part of our Google Apps Admin domain, in
> the org group HPS Staff and Students > HHS > HHS Chrome Sign Builder. Chrome devices (chromebooks and/or chromebits)
> placed in this group automatically boot to kiosk mode displaying the scheduled URL.
> 
> ## Main Usage
> 
> The default URL for the signage is <http://moodle.holliston.k12.ma.us/reeve/signage/hhs-signage.html>, which is found
> on the HHS Moodle Server. The html file relies on two accompanying files, hhs-signage.css and sched-and-lunch.js.
> 
> The html and accompanying files are a custom built webpage that determines today's date, downloads the upcomng
> schedules and lunches, and displays them in a special animated box on the left. It also embeds a default Google
> Slideshow (<https://docs.google.com/presentation/d/1JOiVKW8fxFpeUK59BGSyOwCm2KjtkE54j7ENAzL3rhc/edit#slide=id.p>) in
> the main box on the right. 
> 
> In order to edit the content of the slides, you only need to edit the Google Slides presentation, adding or altering
> slides as needed. The signage is set on a one-hour refresh, so any changes made to the presentation should appear
> within the hour.
> 
> The schedules and lunches displayed are retrieved and displayed automatically. To edit the schedules and lunches,
> simply edit their corresponding Google Calendars: schedules (cal id:
> sulsp2f8e4npqtmdp469o8tmro@group.calendar.google.com)
> and lunches (cal id: holliston.k12.ma.us\_c2d4uic3gbsg7r9vv9qo8a949g@group.calendar.google.com).
> 
> ## Special Cases
> 
> Sometimes it might be useful to set up a schedule to show special slide or set of slides in the main box instead of
> the regular Google Presentation. For example, on the first day of school after winter vacation, I set the signage to
> display a single slide saying "Welcome back" while still letting the schedules and lunches appear. Other times, it
> might be more appropriate to override the entire screen (removing the schedules and lunches area). 
> 
> ## Full Screen Override
> 
> To display something on the entire screen (removing the schedules and lunches areas):
> 
> 1. Create a Google Slides presentation in 16x9 format. Add whatever slide(s) you wish.
> 2. When ready, copy the presentation's URL to your clipboard.
> 3. Complete the steps in Scheduling an Override below.
> 
> ## Slideshow Override
> 
> To display a special set of slides in the slideshow box, leaving the schedules and lunches area in place.
> 
> *Note*: if want your new content to display right away, and are willing to manually turn it off, then simply edit the
> default Google Slides presentation. You can hide slides by right-clicking the slide and choosing "Skip Slide," and
> then you can un-skip them when you are done. The instructions below are only needed if you want the new display to
> turn on/off on an automatic schedule.
> 
> 1. Edit the special slideshow found at
>    <https://docs.google.com/presentation/d/1dYDZwzbld8Q5SUSRJ0bhPQANn7wK-aLJQCeUPnS7TvU/edit#slide=id.g4a1660515e_3_0>
> 2. When done, visit <http://moodle.holliston.k12.ma.us/reeve/signage/hhs-signage-special-embedded.html> to check your
>    work. Then copy its URL.
> 3. Complete the steps in Scheduling an Override below.
> 
> ## Scheduling an Override
> 
> 1. Open Chrome Sign Builder
>    (<https://chrome.google.com/webstore/detail/chrome-sign-builder/odjaaghiehpobimgdjjfofmablbaleem?hl=en-US>)
> 2. If this is your first time using Sign Builder, create a new schedule called HHS Signage. Set its default URL to
>    <http://moodle.holliston.k12.ma.us/reeve/signage/hhs-signage.html/>
> 3. Click the HHS Signage schedule on the left. The schedule will probably appear mostly blank. This is because it is
>    set to display the regular sign content by default.
> 4. Click in the calendar to add a new item. Paste in the URL that you copied in either Full Screen Override or
>    Slideshow Override above, and set it to display on the dates and times that you want.
> 5. When complete, click the Export button to download the configuration/schedule file.
> 6. After the file downloads, a new Chrome tab will appear in the Admin console. Navigate to HPS Staff & Students >
>    HHS > HHS Chrome Sign Builder.
> 7. Under Configure, click the X and then upload your downloaded configuration/schedule file, and click Save.

## Annotations to the Original Documentation

Here is a compiled list of useful links:

* [Default Slideshow](https://docs.google.com/presentation/d/1JOiVKW8fxFpeUK59BGSyOwCm2KjtkE54j7ENAzL3rhc/edit) link
  * Owner: HHSDigitalAccounts@holliston.k12.ma.us
  * The slideshow embed pulls from here.
* [Override Slideshow](https://docs.google.com/presentation/d/1dYDZwzbld8Q5SUSRJ0bhPQANn7wK-aLJQCeUPnS7TvU/edit) link
  * This slideshow doesn't exist at the time of this writing.
  * I haven't ever seen an override slideshow in use anyways, and admin tends to just use hidden slides on the default
    slideshow for any special occasions.
  * As such, the `hhs-signage-special-embedded.html` page is not included in this reimplementation.
* [HHS Daily Schedules](sulsp2f8e4npqtmdp469o8tmro@group.calendar.google.com) calendar ID
* [HHS Lunch Menus](holliston.k12.ma.us_c2d4uic3gbsg7r9vv9qo8a949g@group.calendar.google.com) calendar ID
  * The schedule and lunch data are pulled from these calendars.

*Note*: The second documentation above has some outdated info:

* The website is now hosted on https://hhsdigitalaccounts.github.io/ instead of https://moodle.holliston.k12.ma.us/
* As previously mentioned, the override slideshow seems to neither be in use nor exist at all.

In this implementation, each page is organized into its own folder in the filesystem and can be viewed at its respective
`index.html` file, as opposed to having files such as `hhs-signage.html`. __Most of the remaining information from the
old documentation is still correct, summarized as follows:__

* The lobby digital signage is an HTML web page, located at `lobby-signage/index.html`.
* It pulls data from "Digital Sign Slideshow 4:3" and the two calendars, "HHS Daily Schedules" and "HHS Lunch Menus."
  The data displayed on the page refreshes every 15 minutes.
* To add a special slide to be displayed, just add it to the slideshow. Afterwards, it may be deleted or hidden if it is
  to be used again.
* I believe the remaining information about Chrome Sign Builder is correct but I cannot verify it as I don't have access
  to the control panel for that.
