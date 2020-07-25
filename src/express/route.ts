import express, { response } from 'express';
import path from 'path';
import ForumScraper from '../ForumScraper';
import Fuse from 'fuse.js';
import { BaseItems, tiers } from '../types/BaseItems';
import { getAffixes } from '../types/Affixes';
import { allNames } from '../types/ItemNames';

const router = express.Router();

router.use(
    '/public',
    express.static(path.resolve('./client/public'))
);//

router.use(
    '/static/',
    express.static(path.resolve('./client/build/static'))
);

router.use(express.json());

router.get('/', (request, response) => {
    response.sendFile(path.resolve('./client/build/index.html'));
});

router.get('/baseitems', (request, response) => {
    let bases = Object.keys(BaseItems).map(item => {
        return BaseItems[item].map(i => i.baseName);
    }).flat();

    response.send(bases);
});

router.get('/itemtiers', (request, response) => {
    response.send(tiers);
});

router.get('/affixes', (request, response) => {
    response.send(getAffixes());
});

router.get('/names', (request, response) => {
    response.send(allNames());
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

    if (request.body.itemName !== undefined && request.body.itemName !== null && request.body.itemName !== '' && typeof request.body.itemName === "string") {
        query.include.push(request.body.itemName);
    }

    let includeMatches = query.include.reduce((acc, next) => {
        let itemSearch = new Fuse(acc, {
            isCaseSensitive: false,
            shouldSort: true,
            keys: ['itemSpans'],
            threshold: 0.1
        });
        acc = itemSearch.search(next).map(item => item.item);
        return acc;
    }, [...ForumScraper.itemList].filter(item => item.baseItem.split(' (')[0].toLowerCase().includes(query.baseItem.toLowerCase())));

    let exclude = query.exclude.reduce((acc, next) => {
        let itemSearch = new Fuse(acc, {
            isCaseSensitive: false,
            shouldSort: true,
            keys: ['itemSpans'],
            threshold: 0.1
        });
        acc = itemSearch.search(next).map(item => item.item);
        return acc;
    }, includeMatches);
    response.send(exclude);
});

export default router;
