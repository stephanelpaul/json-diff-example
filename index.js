// Import stylesheets
import './style.css';

const appDiv = document.getElementById('app');

import invoice1 from './invoice1.json';
import invoice2 from './invoice2.json';

const jsondiffpatch = require('jsondiffpatch');
import 'jsondiffpatch/dist/formatters-styles/html.css';

function removeNumericKeysFromHtml(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const numericKeyElements = tempDiv.querySelectorAll('[data-key]');
  numericKeyElements.forEach((element) => {
    if (!isNaN(element.getAttribute('data-key'))) {
      element.removeAttribute('data-key');
      const propertyNameDiv = element.querySelector(
        '.jsondiffpatch-property-name'
      );
      if (propertyNameDiv) {
        propertyNameDiv.remove();
      }
    }
  });

  return tempDiv.innerHTML;
}

const diffpatcher = jsondiffpatch.create({
  objectHash: function (obj) {
    return obj.id || JSON.stringify(obj);
  },
  arrays: {
    detectMove: true,
    includeValueOnMove: false,
  },
  textDiff: {
    minLength: 60,
  },
});

let delta = diffpatcher.diff(invoice1, invoice2);

const formattedHtml = jsondiffpatch.formatters.html.format(delta, invoice1);

const modifiedHtml = removeNumericKeysFromHtml(formattedHtml);

appDiv.innerHTML = modifiedHtml;

console.log(modifiedHtml);
