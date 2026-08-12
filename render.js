const fs = require('fs');
const path = require('path');
const theme = require('jsonresume-theme-flat');

const source = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume.json'), 'utf8'));
const resume = JSON.parse(JSON.stringify(source));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function displayDate(value, present = false) {
  if (!value) return present ? 'Present' : '';
  const match = /^(\d{4})-(\d{2})/.exec(value);
  return match ? `${months[Number(match[2]) - 1]} ${match[1]}` : value;
}

resume.basics.website = resume.basics.url;
for (const item of resume.work || []) {
  item.company = item.name;
  item.website = item.url;
  item.startDate = displayDate(item.startDate);
  item.endDate = displayDate(item.endDate, true);
}
for (const item of resume.volunteer || []) {
  item.startDate = displayDate(item.startDate);
  item.endDate = displayDate(item.endDate, true);
}
for (const item of resume.education || []) {
  item.startDate = displayDate(item.startDate);
  item.endDate = displayDate(item.endDate);
}
for (const item of resume.awards || []) item.date = displayDate(item.date);
for (const item of resume.publications || []) item.releaseDate = displayDate(item.releaseDate);

let html = theme.render(resume);
html = html.replace('</style>', `
/* Local print and long-title fixes. */
#publications .strike-through { height: auto; min-height: 20px; border-top: 0; margin-bottom: 4px; }
#publications .strike-through span:first-child { position: static; display: block; padding-right: 90px; margin-top: 0; }
#publications .strike-through .date { top: 1px; }
@media print {
  @page { size: A4; margin: 7mm 8mm; }
  html { zoom: 0.90; }
  body { margin: 0; font-size: 10.5px; }
  #header { padding: 16px 0; margin-bottom: 6px; }
  #header h1 { font-size: 27px; }
  #header h2 { font-size: 18px; }
  section { margin-top: 9px; }
  #content h3 { font-size: 20px; }
  h4 { font-size: 14px; margin-bottom: 4px; }
  p { line-height: 1.35; }
  .container { max-width: none; width: 100%; }
  .col-sm-12 + .col-sm-12 { margin-top: 9px; }
  #work .summary, #work h4:not(.strike-through) { margin-top: 2px; margin-bottom: 2px; }
  ul { margin-bottom: 4px; }
  li { line-height: 1.3; }
  a { color: #222; }
  #education { break-before: page; page-break-before: always; }
  #education, #awards, #publications, #skills, #languages { break-inside: avoid; page-break-inside: avoid; }
}
</style>`);

for (const output of ['index.html', 'public/index.html']) {
  const target = path.join(__dirname, output);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log(`Rendered ${output}`);
}
