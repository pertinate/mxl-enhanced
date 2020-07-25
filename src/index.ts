import ForumScraper from './ForumScraper';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import routes from './express/route';

async function startScraping() {
    console.log('createInits');
    await ForumScraper.createInits();
    console.log('populateForumUsers');
    await ForumScraper.populateForumUsers();
}

const app = express();
app.listen(8080, () => {
    startScraping();
    setInterval(() => startScraping(), 7200000);
});

app.use(cors());

app.use(routes);

// import json from './JSON/uniques.json';
// console.log(json.length);

// let test = json.filter((value, index) => json.findIndex(val => val.name === value.name) === index);
// console.log(test.length);
// fs.writeFileSync('E:\\Pertinate\\Documents\\GitHub\\mxl-enhanced\\src\\JSON\\uniques.json', JSON.stringify(test));

//https://docs.median-xl.com/doc/items/sacreduniques
// import playwright from 'playwright';

// (
//     async () => {
//         const browser = await playwright['firefox'].launch({
//             headless: false
//         });
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         await page.goto('https://docs.median-xl.com/doc/items/tiereduniques');
//         await page.waitForLoadState('networkidle');
//         let test = [];
//         let pageEval = await page.evaluate(() => {
//             let tables = Array.from(document.querySelectorAll('table'));

//             let modRoll = tables.map(table => {
//                 let trs = Array.from(table.querySelectorAll('tr'));
//                 return trs.map(tr =>
//                     Array.from(tr.querySelectorAll('td')).map(td =>
//                         Array.from(td.querySelectorAll('span')).filter(span => span.className === 'item-magic').map(span => {
//                             return span.innerText.split('\n');
//                         }).filter(val => val.length > 0).flat()).filter(val => val.length > 0)).filter(val => val.length > 0);
//             });
//             return modRoll;
//         });
//         pageEval.forEach(a => a.forEach(b => b.forEach(c => test.push(c.filter(val => val !== '').map(roll => {
//             let minMax = /(\([^)]+\))/gm.exec(roll);
//             let rollName = minMax && minMax.length > 0 && /([0-9]+)/g.test(minMax[0]) || false ? roll.replace(minMax[0], '#') : roll;//.replace(minMax, '#');
//             let minMaxRolls = minMax && minMax.length > 0 && /([0-9]+)/g.test(minMax[0]) ? minMax[0].replace('(', '').replace(')', '').split(' ').filter(v => parseInt(v)) : '';
//             return ({
//                 name: rollName,
//                 min: minMaxRolls[0],
//                 max: minMaxRolls[1]
//             });
//         })))));

        // fs.writeFileSync('E:\\Pertinate\\Documents\\GitHub\\tiereduniques.json', JSON.stringify(test.flat()));

//         console.log(JSON.stringify(test.flat(), null, '\t'));
//     }
// )();
