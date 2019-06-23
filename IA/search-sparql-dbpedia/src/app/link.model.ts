export class LinkModel {

    private name: string;
    public get Name(): string {
        return this.name;
    }
    public set Name(value: string) {
        this.name = value;
    }

    private link: string;
    public get Link(): string {
        return this.link;
    }
    public set Link(value: string) {
        this.link = value;
    }

}
