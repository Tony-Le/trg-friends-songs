import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[];

  constructor(private songService: SongService) { }

  getSongs(searchQuery: string): void {
      this.songService.getSongs(searchQuery).subscribe(data => {
        const resp = JSON.parse(JSON.stringify(data));
        this.songs = resp._embedded.songList;
      });
  }

  ngOnInit(): void {
    // Best practice to call here instead of inside constructor, reserve constructor for intiialization.
    this.getSongs('');
  }

}
