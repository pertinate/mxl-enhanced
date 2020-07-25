import ForumUser, { Item } from "./types/ForumUser";
import playwright from 'playwright';
import Credentials from '../../_credentials/mxl-trade.json';

class ForumScraper {
    forumUsers: ForumUser[] = [];
    hrefs: string[] = [];
    browser: playwright.FirefoxBrowser;
    context: playwright.BrowserContext;
    cookiesCreated: boolean = false;
    itemList: {
        forumLink: string;
        forumName: string;
        forumPosting: string;
        tswCharName: string;
        baseItem?: string;
        location?: string;
        itemSpans?: string[];
    }[] = [];
    href = {
        tradeSection: 'https://forum.median-xl.com/viewforum.php?f=34',
        notArmouryLogin: 'https://tsw.vn.cz/acc/'
    };
    constructor() {
        setInterval(() => {
            console.log('creating item list');
            let chars: {
                forumLink: string;
                forumName: string;
                forumPosting: string;
                tswCharName: string;
                items: {
                    baseItem?: string;
                    location?: string;
                    itemSpans?: string[];
                }[];
            }[] = [];

            this.forumUsers.forEach(forumUser => {
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


            this.itemList = chars.map(char => {
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
        }, 1 * 60 * 1000);
    }

    createInits = async () => {
        this.browser = await playwright['firefox'].launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        this.context = await this.browser.newContext();//
    };

    populateForumUsers = async () => {
        const page = await this.context.newPage();
        await page.goto(this.href.tradeSection, { timeout: 100000 });
        await page.waitForLoadState('networkidle');

        const loginCheck = await page.evaluate(() => {
            const forms = document.querySelectorAll('form');

            return Array.from(forms).map(form => form.action);
        });

        if (loginCheck.find(form => form.includes('ucp.php?mode=login'))) {
            await page.type('[name=username]', Credentials.forum.user);
            await page.type('[type="password"]', Credentials.forum.pass);
        }

        if (!this.cookiesCreated) {
            let page = await this.context.newPage();
            await page.goto(this.href.notArmouryLogin, { timeout: 100000 });
            await page.waitForLoadState('networkidle');
            await page.type('[name=user]', Credentials.notarmoury.user);
            await page.type('[name="pass"]', Credentials.notarmoury.pass);
            await page.waitForLoadState('networkidle');
            await page.close();
            this.cookiesCreated = true;
        }

        await page.waitForLoadState('networkidle');

        const totalTopics = parseInt(/[0-9]+/.exec(await page.evaluate(() => {
            let divs = Array.from(document.querySelectorAll('div'));
            let actionBarBottom = divs.find(div => div.className === 'action-bar bottom');
            let test = Array.from(actionBarBottom.querySelector('div').childNodes).map(child => child.textContent)[2].trim();
            return test;
        }))[0]);

        await Promise.all(Array(Math.ceil(totalTopics / 100)).fill(null).map(async (_, index) => {
            return new Promise(async resolve => {
                let tradeForum = await this.context.newPage();
                try {
                    console.log('Going to page:', `${this.href.tradeSection}&start=${index * 100}`);
                    await tradeForum.goto(`${this.href.tradeSection}&start=${index * 100}`, { timeout: 100000 });
                    await page.waitForLoadState('networkidle');
                    this.hrefs.push(...(await tradeForum.evaluate(() => {
                        let topics = Array.from(document.links).filter(a => a.href.includes('viewtopic') && a.href.includes('?f=') && a.href.includes('&t=') && !a.href.includes('&start=') && !a.href.includes('&p=') && !a.href.includes('&view=') && a.innerText !== '1' && !a.innerText.includes('Patch Notes') && !a.innerText.includes('Announced') && !a.innerText.includes('SEASON'));
                        return topics.map(a => a.href);
                    })));
                    await tradeForum.waitForTimeout(5000);
                    await tradeForum.close();
                    resolve();
                } catch {
                    await tradeForum.close();
                    resolve();
                }
            });
        }));
        await page.close();
        this.populateForumPostings();
    };

    populateForumPostings = async (hrefs = [...this.hrefs]) => {
        let forumUsers = [];
        await Promise.all(hrefs.splice(-25).map(href => {
            return new Promise(async resolve => {
                let playerForum = await this.context.newPage();
                try {
                    console.log('Going to page:', href);
                    await playerForum.goto(href, { timeout: 100000 });
                    await playerForum.waitForLoadState('networkidle');
                    let forumName = await playerForum.evaluate(() => {
                        let forumName = Array.from(document.querySelectorAll('a')).filter(a => a.className.includes('username') && a.href.includes('memberlist.php?mode=viewprofile&u'))[0];
                        return {
                            username: forumName.innerText,
                            profile: forumName.href
                        };
                    });

                    let listedChars = Array.from(await playerForum.evaluate(() => {
                        let links = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('https://tsw.vn.cz/acc/char.php'));
                        return links.map(a => a.href);
                    }));

                    if (listedChars.length > 0) {
                        let forumUser = this.forumUsers.find(user => user.forumName === forumName.username);
                        const shouldPush = forumUser ? true : false;
                        if (!forumUser) {
                            forumUser = this.forumUsers[this.forumUsers.push(new ForumUser(forumName.username)) - 1];
                            forumUser.forumPosting = href;
                            forumUser.forumLink = forumName.profile;
                        }
                        forumUser.listedChars = [];
                        forumUser.itemsToSearch = [];
                        forumUser.listedChars.push(...listedChars);

                        if (shouldPush) {
                            forumUsers.push(forumUser);
                        }
                    }
                    await playerForum.close();
                    resolve();
                } catch {
                    await playerForum.close();
                    resolve();
                }
            });
        }));
        this.populateItemsPerForumPost(forumUsers);
        await new Promise(resolve => setTimeout(() => { resolve(); }, 15000));
        this.populateForumPostings(hrefs);
    };

    populateItemsPerForumPost = async (list: ForumUser[] = [...this.forumUsers]) => {
        await Promise.all(list.map(forumUser => {
            return new Promise(resolve => {
                Promise.all(forumUser.listedChars.map(char => {
                    return new Promise(async resolve => {
                        let tswCharPage = await this.context.newPage();
                        try {
                            console.log(`Going to char: ${char}`);
                            await tswCharPage.goto(char, { timeout: 100000 });
                            await tswCharPage.waitForLoadState('networkidle');
                            await tswCharPage.waitForTimeout(5000);
                            let data = await tswCharPage.evaluate(() => {
                                let charName = document.querySelector('h1').childNodes[0].textContent;
                                let divs = Array.from(document.querySelectorAll('div'));
                                let table = divs.find(div => div.className === 'dataTables_wrapper no-footer' && div.id === 'itemdump_wrapper');
                                if (table) {
                                    let tableRows = Array.from(table.querySelectorAll('tr'));
                                    let fixedRows = tableRows.map(tr => {
                                        // return Array.from(tr.querySelectorAll('td')).map(td => td.className);
                                        let tableDefs = Array.from(tr.querySelectorAll('td'));
                                        let baseItem = tableDefs.find(td => td.className.includes('sorting_2'));
                                        let location = tableDefs.find(td => td.className.includes('sorting_1'));
                                        let itemInfoTD = tableDefs.find(td => td.className.includes('sorting_3'));
                                        let imgHref = itemInfoTD ? itemInfoTD.querySelector('img').src : '';
                                        let itemSpans = itemInfoTD ? Array.from(itemInfoTD.querySelectorAll('span')).map(span => Array.from(span.children).map(child => child.textContent)).map(val => val.filter(values => values !== "").map(values => values.includes('\n') ? values.split('\n') : values).flat()).filter(val => val.length > 0).flat(100) : [];
                                        return {
                                            baseItem: baseItem ? baseItem.innerText : '',
                                            location: location ? location.innerText : '',
                                            imgSrc: `mxl.trade.pertinate.info/public/img/${imgHref.split('/').pop()}`,
                                            itemSpans: itemSpans.reduce((acc, next) => {//
                                                if (typeof next === 'string') {
                                                    acc.push(next);
                                                } else {
                                                    acc.push(...next.flat());
                                                }
                                                return acc;
                                            }, [])
                                        };
                                    });
                                    return {
                                        charName,
                                        data: fixedRows
                                    };
                                };
                                return {
                                    charName,
                                    data: []
                                };
                            });
                            let forumUserReal = this.forumUsers.findIndex(user => user.forumLink === forumUser.forumLink);
                            console.log('Pushing items for forum user:', this.forumUsers[forumUserReal].forumName);
                            this.forumUsers[forumUserReal].itemsToSearch.push({
                                charName: data.charName,
                                data: data.data
                            });
                            await tswCharPage.close();
                            resolve();
                        } catch (error) {
                            console.error('Failed to get char data', error);
                            await tswCharPage.close();
                            resolve();
                        }
                    });
                }))
                    .then(() => resolve())
                    .catch(() => resolve());
            });
        }));
    };
}

export default new ForumScraper();
