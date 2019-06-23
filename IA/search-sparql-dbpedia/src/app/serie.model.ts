import { LinkModel } from './link.model';
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

    private genreLink: Url;
    public get GenreLink(): Url {
        return this.genreLink;
    }
    public set GenreLink(value: Url) {
        this.genreLink = value;
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

    private producers: LinkModel[] = [];
    public get Producers() {
        return this.producers;
    }
    public set Producers(value: LinkModel[]) {
        this.producers = value;
    }
    private directors: LinkModel[] = [];
    public get Directors() {
        return this.directors;
    }
    public set Directors(value: LinkModel[]) {
        this.directors = value;
    }

    private starrings: LinkModel[] = [];
    public get Starrings() {
        return this.starrings;
    }
    public set Starrings(value: LinkModel[]) {
        this.starrings = value;
    }
}
