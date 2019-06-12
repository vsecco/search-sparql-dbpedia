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
  title = 'search-sparql-dbpedia';
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
}
