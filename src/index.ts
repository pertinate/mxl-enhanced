import ForumScraper from './ForumScraper';
import express from 'express';
import cors from 'cors';
import path from 'path';

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
interface CharObj {
    forumLink: string;
    forumName: string;
    forumPosting: string;
    tswCharName: string;//
    items: {
        baseItem?: string;
        location?: string;
        itemSpans?: string[];
    }[];
}

app.use(
    '/public/',
    express.static(path.resolve('./client/public'))
);

app.use(
    '/static/',
    express.static(path.resolve('./client/build/static'))
);

app.use(routes);

app.get('/', (request, response) => response.sendFile(path.resolve('./client/build/index.html')));

app.get('/test', (request, response) => {
    let queries = Array.isArray(request.query.searchParam) ? request.query.searchParam : [request.query.searchParam];
    let baseItem = request.query.baseItem;
    // console.log('incoming request');
    let chars: Array<CharObj> = [];
    ForumScraper.forumUsers.forEach(forumUser => {
        forumUser.itemsToSearch.forEach(item => {
            let tswCharName = item.charName.split(' (')[0];
            let tswChar = {
                forumLink: forumUser.forumLink,
                forumName: forumUser.forumName,
                forumPosting: forumUser.forumPosting,
                tswCharName,
                items: item.data.filter(val => val !== "")
            };
            chars.push(tswChar);
        });
    });
    let itemList = chars.map(char => {
        return char.items.map(item => {
            return {
                ...item,
                forumLink: char.forumLink,
                forumName: char.forumName,
                forumPosting: char.forumPosting,
                tswCharName: char.tswCharName,
            };
        });
    }).flat(1).filter(val => val.baseItem !== "");
    // console.log('sending response', ForumScraper.forumUsers.length, itemList, queries);
    response.send(itemList.filter(item => queries.some(query => item.itemSpans.find(span => span.toLowerCase().includes(query.toString().toLowerCase()))) && (baseItem ? item.baseItem.split(' (')[0].toLowerCase() === baseItem.toString().toLowerCase() : true)));
});
