'use strict';
const fs = require('fs');
const obj = require('./events.json');
let content = '# Events & Conferences\nA list of events and conferences you can find the Front End Happy Hour panelists at.';

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

  content += (
    `\n## [${event.event}](${event.url})
**Where:** ${event.where}
**When:** ${event.date}
**Attending:** ${who}
${event.desc}\n\n`
  );
}

// create README with the list of conferences
fs.writeFile('./README.md', content, function (err) {
  if (err) throw err;
  console.log('Updated event list');
});