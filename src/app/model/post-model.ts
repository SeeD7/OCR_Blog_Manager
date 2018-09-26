export class Post {
    title: string;
    content: string;
    loveIts: number;
    createdAt: number;

    constructor (title: string, content: string) {
        this.title = title;
        this.content = content;
        this.loveIts = 0;
        this.createdAt = Date.now();
    }
}
