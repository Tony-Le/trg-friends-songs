import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';
import { UserAlertService } from '../user-alert/user-alert.service';
import { AppComponent } from '../app.component'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SongSearchComponent } from '../song-search/song-search.component'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[];
  currentSearchQuery: string;
  currentSearchPage: number;
  message: string;
  static randomSearch = ['mario', 'pokemon', 'zelda'];

  constructor(private songService: SongService, private userAlertService: UserAlertService, private appComponent: AppComponent, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Best practice to call here instead of inside constructor, reserve constructor for initialization.
    
    this.route.queryParams.subscribe(params => {
      this.currentSearchQuery = params['searchQuery'];
      this.getSongs(this.currentSearchQuery)
    });
    if (this.currentSearchQuery == '' || this.currentSearchQuery == null) {
      const rand = Math.floor(Math.random() * (SongsComponent.randomSearch.length));
      this.getSongs(SongsComponent.randomSearch[rand]);
    }
  }

  getSongs(searchQuery: string): void {
    this.currentSearchQuery = searchQuery;
    this.currentSearchPage = 0;
    const loadingSpinner = document.getElementById("scrollSpinner");
    if (loadingSpinner.classList.contains("hidden")) {
      loadingSpinner.classList.add("shown");
      loadingSpinner.classList.remove("hidden");
    }
    this.songService.getSongs(searchQuery).subscribe(data => {
      const resp = JSON.parse(JSON.stringify(data));
      if (resp._embedded) {
        this.userAlertService.clear();
        this.message = '';
        this.songs = resp._embedded['songList'];
        
      }
      else if (!resp._embedded) {
        this.message = 'No results found.';
      }
      if (loadingSpinner.classList.contains("shown")) {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("shown");
      }
    });
  }

  getMoreSongs(): void {
    console.log('reached bottom')
    this.currentSearchPage += 1;
    const loadingSpinner = document.getElementById("scrollSpinner");
    if (loadingSpinner.classList.contains("hidden")) {
      loadingSpinner.classList.add("shown");
      loadingSpinner.classList.remove("hidden");
    }
    this.songService.getSongs(this.currentSearchQuery, this.currentSearchPage).subscribe(data => {
      const resp = JSON.parse(JSON.stringify(data));
      if (resp._embedded) {
        this.userAlertService.clear();
        this.songs = this.songs.concat(resp._embedded['songList']);
      }
      if (loadingSpinner.classList.contains("shown")) {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("shown");
      }
    });
  }
  

  displayInPlayer(id: string): void {
    event.preventDefault();
    const playerDiv = document.getElementById('playerDiv');
    if (playerDiv.classList.contains("hidden")) {
      playerDiv.classList.remove("hidden");
      playerDiv.classList.add("shown")
    }
    const newPlayer = document.createElement('iframe');
    newPlayer.setAttribute('id', 'framePlayer');
    newPlayer.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?autoplay=1');
    newPlayer.setAttribute('frameborder','0');
    newPlayer.setAttribute('allow','accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    newPlayer.setAttribute('allowfullscreen','');

    while (playerDiv.firstChild) {
      playerDiv.removeChild(playerDiv.firstChild);
    }
    playerDiv.appendChild(newPlayer);
    this.appComponent.topFunction();
  }
}
