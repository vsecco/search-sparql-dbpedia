import { DbpediaServiceService } from './dbpedia-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-sparql-dbpedia';

  constructor(private dbpediaService: DbpediaServiceService) {
    this.dbpediaService.get();
  }
}
