export interface Item {
    charName?: string,
    data: ({
        baseItem?: string,
        location?: string,
        imgSrc?: string,
        itemSpans?: string[];
    })[];
}

export default class ForumUser {
    forumName: string;
    listedChars: string[] = [];
    forumPosting: string;
    forumLink: string;
    discordID: string;
    itemsToSearch: Item[] = [];
    constructor(forumName: string) {
        this.forumName = forumName;
    }
}
