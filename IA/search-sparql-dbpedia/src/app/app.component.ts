import { DbpediaServiceService } from './dbpedia-service.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SeriesModel } from './series.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public Genre: string;
  public Director: string;
  public Starring: string;
  public Language: string;
  public Country: string;
  public Producer: string;
  public ReleasedDate: string;
  public series: SeriesModel[] = [];

  constructor(private dbpediaService: DbpediaServiceService, public spinner: NgxSpinnerService) {
    this.initialCallToDbPedia();
  }

  public initialCallToDbPedia() {
    this.title = '';
    this.Genre = 'Situation comedy';
    this.Director = '';
    this.Starring = '';
    this.Language = 'English';
    this.Country = 'United States';
    this.Producer = '';
    this.ReleasedDate = '';
    setTimeout(() => this.spinner.show(), 25);
    this.dbpediaService.get(this.title, this.Genre, this.Director, this.Language, this.Producer, this.ReleasedDate, this.Starring, this.Country).then((series) => {
      this.series = series;
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    });
  }

  public valuechange(value: string, subject: string) {
    console.log(value);
    console.log(subject);
    switch (subject) {
    case 'Title':
      this.title = value;
      break;
    case 'Genre':
      this.Genre = value;
      break;
    case 'Director':
      this.Director = value;
      break;
    case 'Language':
      this.Language = value;
      break;
    case 'Producer':
      this.Producer = value;
      break;
    case 'RelesedDate':
      this.ReleasedDate = value;
      break;
    case 'Starring':
      this.Starring = value;
      break;
    case 'Country':
      this.Country = value;
      break;
    }

    this.spinner.show();
    this.dbpediaService.get(this.title, this.Genre, this.Director, this.Language, this.Producer, this.ReleasedDate, this.Starring, this.Country).then((series) => {
      this.series = series;
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    });
  }
}
