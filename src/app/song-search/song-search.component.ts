import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {

  @Input() value: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToSearchSong(searchQuery: string) {
    if (!(searchQuery == '' || searchQuery == null)) {
      this.router.navigate(['songs'], { 'queryParams': { 'searchQuery': searchQuery } });
    }
  }
}
