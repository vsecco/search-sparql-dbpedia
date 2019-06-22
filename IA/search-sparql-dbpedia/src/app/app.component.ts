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
    setTimeout(() => this.spinner.show(), 25);
    this.dbpediaService.get().then((series) => {
      this.series = series;
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    });
  }

  public valuechange(e: string, subject: string) {
    console.log(e);
    console.log(subject);
    this.spinner.show();
    this.dbpediaService.get().then((series) => {
      this.series = series;
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    });
  }
}
