import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrls: ['./reddit-search.component.scss']
})
export class RedditSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  doSearch(searchTerm: string): void {
    this.result = [];

    this.ris.search(searchTerm)
        .subscribe((results) => {
            this.results = results;
        });
    
  }
}
