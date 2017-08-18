const fs = require('fs');
const prompt = require('prompt');
const events = fs.readFileSync('./events.json');
const fullList = JSON.parse(events);

// prompt schema
const schema = {
  properties: {
    event: {
      description: 'Event title',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    url: {
      description: 'Event URL',
      pattern: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
      message: 'Must be a valid URL',
      required: true
    },
    when: {
      description: 'Event dates (make sure to add the year)',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    where: {
      description: 'Event location',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    who: {
      description: 'Who is attending? (comma seperated)',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    description: {
      description: 'Description if we are attending or speaking',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    }
  }
};

// start prompt
prompt.start();

// prompt questions
prompt.get(schema, function (err, result) {
  const names = [result.who];
  // pull the year from date
  const year = result.when.substr(result.when.length - 4);
  // create a new object
  const obj = {'event': result.event, 'url': result.url, 'date': result.when, 'where': result.where, 'year': year, 'who': names, 'desc': result.description};
  // push new object to the full list
  fullList.push(obj);
  // sync the updated list with events.json
  fs.writeFileSync('./events.json', JSON.stringify(fullList, null, 4));
  console.log('New event added!');
});
