import express, { response } from 'express';
import path from 'path';
import ForumScraper from '../ForumScraper';
import Fuse from 'fuse.js';

const router = express.Router();

router.use(
    '/public',
    express.static(path.resolve('./client/public'))
);

router.use(
    '/static/',
    express.static(path.resolve('./client/build/static'))
);

router.use(express.json());

router.get('/', (request, response) => {
    response.sendFile(path.resolve('./client/build/index.html'));
});

router.post('/query', (request, response) => {
    let query: {
        include?: string[],
        exclude?: string[],
        baseItem?: string;
    } = {
        include: request.body.include || [],
        exclude: request.body.exclude || [],
        baseItem: request.body.baseItem || ''
    };
    console.log('/query', query);



    let includeMatches = query.include.reduce((acc, next) => {
        let itemSearch = new Fuse(acc, {
            isCaseSensitive: false,
            shouldSort: true,
            keys: ['itemSpans']
        });
        acc = itemSearch.search(next).map(item => item.item);
        return acc;
    }, [...ForumScraper.itemList].filter(item => item.baseItem.split(' (')[0].toLowerCase().includes(query.baseItem.toLowerCase())));

    console.log('/query', includeMatches);

    let exclude = query.exclude.reduce((acc, next) => {
        let itemSearch = new Fuse(acc, {
            isCaseSensitive: false,
            shouldSort: true,
            keys: ['itemSpans']
        });
        acc = itemSearch.search(next).map(item => item.item);
        return acc;
    }, includeMatches);
    console.log('/query', exclude);
    response.send(exclude);
});

export default router;
