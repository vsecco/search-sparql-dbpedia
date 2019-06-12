import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SeriesModel } from './series.model';
import { SerieModel } from './serie.model';


@Injectable({
  providedIn: 'root'
})
export class DbpediaServiceService {

  public series: SeriesModel[] = [];

  constructor(private http: HttpClient) { }

  public get(): Promise<SeriesModel[]> {
    const serieTemp = [];
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      const urlWithData = 'http://dbpedia.org/sparql';
      this.http.get<any>(urlWithData, { headers, params: {
        query:
        `SELECT DISTINCT ?film_title ?film_abstract ?film_genre ?name
        WHERE {
        ?film_title rdf:type dbo:Film .
        ?film_title rdfs:comment ?film_abstract .
        ?film_title dbo:genre ?film_genre .
        ?film_title foaf:name ?name .
        } LIMIT 500
        `,
        format: 'json'
      }, }).subscribe((serverResponse) => {
        serverResponse.results.bindings.forEach(serie => {
           serieTemp.push(this.parseToModel(serie));
        });
        this.series = serieTemp;
        resolve(this.series);
      }, ((error) => {
        reject(error);
      }));
    });
  }

  private parseToModel(serverResponse: any): SerieModel {
    const serie: SerieModel = new SerieModel();

    serie.Abstract = serverResponse.film_abstract.value;
    serie.TitleLink = serverResponse.film_title.value;
    serie.Genre = serverResponse.film_genre.value;
    serie.Title = serverResponse.name.value;

    return serie;
  }
}
