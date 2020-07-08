import { Injectable } from '@angular/core';
import { Song } from './song';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songsUrl = 'https://trg-friends-songs-api.herokuapp.com/songs/api/search?query=';
  // private songsUrl = 'http://localhost:8080/songs/api/search?query=';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`SongService: ${message}`);
  }

  getSongs(searchQuery: string) {
    // this.log('fetched songs');
    return this.http.get(this.songsUrl + searchQuery);
  }
}
