import { SerieModel } from './serie.model';

export class SeriesModel {

    private series: SerieModel[] = [];
    public get Series() {
        return this.series;
    }
    public set Series(value: SerieModel[]) {
        this.series = value;
    }
}
