import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DbpediaServiceService {

  constructor(private http: HttpClient) { }

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      const urlWithData = 'http://dbpedia.org/sparql';
      this.http.get<any>(urlWithData, { headers, params: {
        query:
        `SELECT DISTINCT ?film_title ?film_abstract ?film_genre
        WHERE {
        ?film_title rdf:type dbo:Film .
        ?film_title rdfs:comment ?film_abstract .
        ?film_genre dbo:genre ?film_genre .
        } LIMIT 200
        `,
        format: 'json'
      }, }).subscribe((serverResponse) => {
        console.log(serverResponse);
        resolve(serverResponse);
      }, ((error) => {
        reject(error);
      }));
    });
  }
}
