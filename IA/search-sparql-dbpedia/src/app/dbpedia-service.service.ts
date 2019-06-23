import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SeriesModel } from './series.model';
import { SerieModel } from './serie.model';
import { LinkModel } from './link.model';


@Injectable({
  providedIn: 'root'
})
export class DbpediaServiceService {

  public series: SeriesModel[] = [];

  constructor(private http: HttpClient) { }

  public get(title?, Genre?, Director?, Language?, Producer?, ReleasedDate?, Starring?, Country?): Promise<SeriesModel[]> {
    console.log(title);
    console.log(Genre);
    const serieTemp = [];
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      const urlWithData = 'http://dbpedia.org/sparql';
      this.http.get<any>(urlWithData, { headers, params: {
        // query:
        // `#PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        // #PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        // #PREFIX dbo: <http://dbpedia.org/ontology/>
        // #PREFIX dbp: <http://dbpedia.org/property/>
        // #PREFIX foaf:  <http://xmlns.com/foaf/0.1/> .

        // SELECT distinct (SAMPLE(?movie) AS ?movie) ?film_title ?film_starring ?film_producer ?film_director ?film_language ?film_country ?film_abstract ?film_genre ?film_releaseDate
        // WHERE {
        //     ?movie rdf:type dbo:Film .
        //     ?movie foaf:name ?film_title.
        //     ?movie dbo:starring ?film_starring.
        //     ?movie dbo:producer ?film_producer.
        //     ?movie dbo:director ?film_director.
        //     ?movie dbp:language ?film_language.
        //     ?movie dbp:country ?film_country.
        //     ?movie dbo:abstract ?film_abstract .
        //     ?movie dbo:releaseDate ?film_releaseDate .
        //     ?movie dbo:genre ?film_genre .
        // }LIMIT 500
        // `,
        query:
        `#PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        #PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        #PREFIX dbo: <http://dbpedia.org/ontology/>
        #PREFIX dbp: <http://dbpedia.org/property/>
        #PREFIX foaf:  <http://xmlns.com/foaf/0.1/> .

        SELECT distinct ?movie (GROUP_CONCAT(DISTINCT ?film_title;separator=",")) AS ?film_title (GROUP_CONCAT(DISTINCT ?star_name;separator=",")) AS ?star_name (GROUP_CONCAT(DISTINCT ?film_starring;separator=",")) AS ?film_starring
                               (GROUP_CONCAT(DISTINCT ?film_producer;separator=",")) AS ?film_producer (GROUP_CONCAT(DISTINCT ?producer_name;separator=",")) AS ?producer_name (GROUP_CONCAT(DISTINCT ?film_director;separator=",")) AS ?film_director (GROUP_CONCAT(DISTINCT ?director_name;separator=",")) AS ?director_name ?film_language ?film_country ?film_genre ?genre_label ?film_releaseDate ?film_abstract
        WHERE {
            ?movie foaf:name ?film_title.
            ?movie dbo:starring ?film_starring.
            ?film_starring foaf:name ?star_name.
            ?movie dbo:producer ?film_producer.
            ?film_producer foaf:name ?producer_name.
            ?movie dbo:director ?film_director.
            ?film_director foaf:name ?director_name.
            ?movie dbp:language ?film_language.
            ?movie dbp:country ?film_country.
            ?movie dbo:abstract ?film_abstract.
            ?movie dbo:releaseDate ?film_releaseDate .
            ?movie dbo:genre ?film_genre.
            ?film_genre rdfs:label ?genre_label.
            FILTER ((?film_title LIKE "%${title}%") && (?star_name LIKE "%${Starring}%") && (?producer_name LIKE "%${Producer}%") && (?director_name LIKE "%${Director}%")
                   && (?film_language LIKE "%${Language}%") && (?film_country LIKE "%${Country}%") && (?genre_label LIKE "%${Genre}%") && (?film_releaseDate LIKE "${ReleasedDate}%")).
        }LIMIT 2000`,
        format: 'json'
      }, }).subscribe((serverResponse) => {
        console.log(serverResponse);
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
    serie.GenreLink = serverResponse.film_genre.value;
    serie.Genre = serverResponse.genre_label.value;
    serie.Country = serverResponse.film_country.value;
    // serie.Directors = serverResponse.film_director.value;
    serie.Directors = this.parseToModelLink(serverResponse.film_director.value, serverResponse.director_name.value);
    serie.Language = serverResponse.film_language.value;
    // serie.Producers = serverResponse.film_producer.value;
    serie.Producers = this.parseToModelLink(serverResponse.film_producer.value, serverResponse.producer_name.value);
    serie.ReleaseDate = serverResponse.film_releaseDate.value;
    serie.Starrings = this.parseToModelLink(serverResponse.film_starring.value, serverResponse.star_name.value);
    serie.TitleLink = serverResponse.movie.value;

    return serie;
  }

  private parseToModelLink(serverResponseLinks: string, serverResponseNames: string): LinkModel[] {
    const linksModel: LinkModel[] = [];

    serverResponseLinks.split(',').forEach((link, index) => {
      const linkModel: LinkModel = new LinkModel();
      linkModel.Link = link;
      linkModel.Name = serverResponseNames.split(',')[index];
      linksModel.push(linkModel);
    });
    return linksModel;
  }
}
