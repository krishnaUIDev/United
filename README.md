# United Airlines: The Next Generation
This is the repository for the United Airlines homepage redesign.

## Coding Style
[Coding style documentation](docs/coding-style.md)

## Architecture presentation
[Presentation](presentation/slides.md)

## Most relevant libraries used in this project
```javascript
{   
  "immutable",
  "intl",
  "react",
  "react-dom",
  "react-intl",
  "react-redux",
  "react-router",
  "react-router-redux",
  "redux",
  "redux-saga",
  "reselect",
}
```

## Development Process
* Move ticket from "Ready for Dev" to "In Dev" in JIRA
* Mark yourself as Assignee
* Create new branch from dev titled the ticket you are working on
* Do the thing
* Browser testing (see accepted browsers list below)
* Accessibility testing (see Accessibility below)
* Unit tests (`npm run test`)
* Pull latest from development
* Push code
* Create PR
  * Title: Ticket + Short Title (ex: HR-41: Display Calendar)
  * Add a description. Include any fixes, changes, new packages, etc.
  * Include this block of text:
  
  ```
  - [ ] Browser testing (Chrome, Firefox, Safari, IE 11, Edge, mobile devices)
  - [ ] Accessibility testing (NVDA + Firefox, Voiceover + Safari)
  - [ ] Unit test passed
  ```
  
  * Choose two reviewers
  * Set a label (if applicable)
  * Set milestone to the current sprint
  * Submit PR and check the boxes you created above when verified. A PR will not be reviewed unless all three are checked.
* Copy the Pull Request URL and paste it into the JIRA ticket
* Once reviewed and internal unit testing is completed, the code will be merged into the `development` branch.
* Ask for a deploy in the #devs channel on Slack
* If this is a new feature, announce a Desk Check in the #general channel tagging @here.
* If this is a bug fix announce in the #testing channel which tickets are ready for testing.
* Move the ticket(s) in the JIRA board from "In Dev" to "Dev Complete"

## Accepted Browsers
### Desktop:
* Internet Explorer 11
* Microsoft Edge
* Google Chrome (last 3 versions)
* Mozilla Firefox (last 3 versions)
* Apple Safari (last 3 versions)

### Mobile:
* iOS Safari
* Android Browser

## Accessibility testing
This projects conforms to ADA Accessibility standards. Please test your code using the following screen readers below before creating a pull request.

### Supported Screen Readers
**High Priorty**

* NVDA
* Voiceover on iOS (mobile)

**Low Priority**

* JAWS
* Voiceover on MacOS
* Talkback on Android (mobile)

### Setting up for testing
* If you do not have a Windows system, download and install VirtualBox.
* Download official Microsoft images for Windows 8 with IE 11, and Windows 10 with Edge
* Once installed, run the image package and VirtualBox will auto setup the VM for you.
* Double click the VM to run.
* Once at the desktop, open Internet Explorer, download and install Mozilla Firefox.
* Search for NVDA and JAWS. Download and install both.
* Run NVDA. Under preferences choose Mouse Control and turn off mouse tracking.
* Repeat these steps in the Windows 10 with Edge image.
