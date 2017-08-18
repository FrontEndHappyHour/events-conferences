'use strict';
const fs = require('fs');
const obj = require('./events.json');
let content = '# Events & Conferences\nA list of events and conferences you can find the Front End Happy Hour panelists at.';
const events2016 = [];
const events2017 = [];
let newObj;

// create list of events
for (const event of obj) {

  let who = '';
  for (let i = 0; i < event.who.length; i++){
    if(i + 1 < event.who.length) {
      who += event.who[i] + ', ';
    }else {
      who += event.who[i];
    }
  }

  // create an object of the event details
  newObj = {
    'event': event.event,
        'url': event.url,
        'where': event.where,
        'date': event.date,
        'year': event.year,
        'who': who,
        'desc': event.desc
  };

  // add 2016 events to new object
  if(event.year === '2016') {
    events2016.push(newObj);
  }else if(event.year === '2017') {
    events2017.push(newObj);
  }
}

// content details displayed on the readme
let readmeContent = (event, url, where, date, who, desc) => {
  return `\n## [${event}](${url})\n
**Where:** ${where}\n
**When:** ${date}\n
**Attending:** ${who}\n
${desc}\n\n`
}

// create a heading for the year
content += '\n# 2017\n';

for (const event of events2017) {
  content += readmeContent(event.event, event.url, event.where, event.date, event.who, event.desc);
}

// create a heading for the year
content += '\n\n# 2016\n';

for (const event of events2016) {
  content += readmeContent(event.event, event.url, event.where, event.date, event.who, event.desc);
}

// create README with the list of conferences
fs.writeFile('./README.md', content, function (err) {
  if (err) throw err;
  console.log('Updated event list');
});