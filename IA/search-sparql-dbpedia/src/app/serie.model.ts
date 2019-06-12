import { Url } from 'url';

export class SerieModel {

    private title: Url;
    public get Title(): Url {
        return this.title;
    }
    public set Title(value: Url) {
        this.title = value;
    }

    private titleLink: Url;
    public get TitleLink(): Url {
        return this.titleLink;
    }
    public set TitleLink(value: Url) {
        this.titleLink = value;
    }

    private abstract: string;
    public get Abstract(): string {
        return this.abstract;
    }
    public set Abstract(value: string) {
        this.abstract = value;
    }

    private genre: Url;
    public get Genre(): Url {
        return this.genre;
    }
    public set Genre(value: Url) {
        this.genre = value;
    }
}
