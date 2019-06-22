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
        `#PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        #PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        #PREFIX dbo: <http://dbpedia.org/ontology/>
        #PREFIX dbp: <http://dbpedia.org/property/>
        #PREFIX foaf:  <http://xmlns.com/foaf/0.1/> .

        SELECT distinct (SAMPLE(?movie) AS ?movie) ?film_title ?film_starring ?film_producer ?film_director ?film_language ?film_country ?film_abstract ?film_genre ?film_releaseDate
        WHERE {
            ?movie rdf:type dbo:Film .
            ?movie foaf:name ?film_title.
            ?movie dbo:starring ?film_starring.
            ?movie dbo:producer ?film_producer.
            ?movie dbo:director ?film_director.
            ?movie dbp:language ?film_language.
            ?movie dbp:country ?film_country.
            ?movie dbo:abstract ?film_abstract .
            ?movie dbo:releaseDate ?film_releaseDate .
            ?movie dbo:genre ?film_genre .
        }LIMIT 500
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
    serie.Title = serverResponse.film_title.value;
    serie.Genre = serverResponse.film_genre.value;
    serie.Country = serverResponse.film_country.value;
    serie.Director = serverResponse.film_director.value;
    serie.Language = serverResponse.film_language.value;
    serie.Producer = serverResponse.film_producer.value;
    serie.ReleaseDate = serverResponse.film_releaseDate.value;
    serie.Starring = serverResponse.film_starring.value;
    serie.TitleLink = serverResponse.movie.value;

    return serie;
  }
}
