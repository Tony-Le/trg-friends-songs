import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';
import { UserAlertService } from '../user-alert/user-alert.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[];
  message: string;

  constructor(private songService: SongService, private userAlertService: UserAlertService) { }

  ngOnInit(): void {
    // Best practice to call here instead of inside constructor, reserve constructor for intiialization.
    this.getSongs('');
    window.onscroll = this.toggleScrollButtonVisibility;
  }

  getSongs(searchQuery: string): void {
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
    this.topFunction();
  }

  

  toggleScrollButtonVisibility() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  }

  topFunction() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
