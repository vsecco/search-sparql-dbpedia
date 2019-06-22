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

    private country: string;
    public get Country(): string {
        return this.country;
    }
    public set Country(value: string) {
        this.country = value;
    }
    private releaseDate: string;
    public get ReleaseDate(): string {
        return this.releaseDate;
    }
    public set ReleaseDate(value: string) {
        this.releaseDate = value;
    }

    private language: string;
    public get Language(): string {
        return this.language;
    }
    public set Language(value: string) {
        this.language = value;
    }

    private producer: string;
    public get Producer(): string {
        return this.producer;
    }
    public set Producer(value: string) {
        this.producer = value;
    }
    private director: string;
    public get Director(): string {
        return this.director;
    }
    public set Director(value: string) {
        this.director = value;
    }

    private starring: string;
    public get Starring(): string {
        return this.starring;
    }
    public set Starring(value: string) {
        this.starring = value;
    }
}
