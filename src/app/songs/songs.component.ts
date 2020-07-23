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

  getSongs(searchQuery: string): void {
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
      });
  }

  ngOnInit(): void {
    // Best practice to call here instead of inside constructor, reserve constructor for intiialization.
    this.getSongs('');
  }

}
