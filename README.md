# EG-CMS

A flexible and easy to use cms. This library uses Ember.js and is backed by a Google Spreadsheet
as the datastore. You can easily host a EG-CMS since its just html, css, and javascript.
No database required.


## Demo Spreadsheet

The following Google Drive spreadsheet is public and has been published to the web:
https://docs.google.com/spreadsheet/pub?key=0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc&gid=0

Each regular sheet in this spreadsheet is for a single page in the cms. The exception sheets are listed
in the globalPages array. These global pages contain data that's meant to be displayed on multiple pages.


## Google Spreadsheets API

Documentation: https://developers.google.com/google-apps/spreadsheets/

The following two HTTP GET requests are used to query data from a public google spreadsheet:

1. Worksheet Feed - provides all sheet names and ids

  ```javascript
    var spreadsheetKey = '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc';
    $.getJSON('https://spreadsheets.google.com/feeds/worksheets/' + spreadsheetKey + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        console.log('all data', response);
        // returns an array of sheet names and ids
        console.log('relevant data', response.feed.entry);
      }
    );
  ```

2. List Feed - provides data for a specific sheet in the worksheet. The spreadsheets api assumes the first row
 in each sheet contains column names.

  ```javascript
    var spreadsheetKey = '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc';
    $.getJSON('https://spreadsheets.google.com/feeds/list/' + spreadsheetKey + '/1/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        console.log('all data', response);
        // returns an array of data for each row in the sheet
        console.log('relevant data', response.feed.entry);
      }
    );
  ```


## Configure Development Environment

1. clone this repo: `git clone https://github.com/gregjopa/eg-cms.git`
2. change directory: `cd eg-cms`
3. install node dependencies: `npm install`
4. install bower dependencies: `bower install`
5. start your local dev server: `grunt server --force`
