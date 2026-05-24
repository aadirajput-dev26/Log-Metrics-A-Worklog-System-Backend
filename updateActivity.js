import fs from 'fs';
let code = fs.readFileSync('src/models/activityRecord.js', 'utf8');
code = code.replace(/enum\s*:\s*\[\s*"TASK"\s*,\s*"BREAK"\s*\]/g, 'enum : ["TASK", "BREAK", "MEETING", "LEARNING", "PLANNING"]');
fs.writeFileSync('src/models/activityRecord.js', code);
console.log('Done');
