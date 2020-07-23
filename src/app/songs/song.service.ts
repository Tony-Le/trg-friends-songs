import { Injectable } from '@angular/core';
import { Song } from './song';
import { Observable, of } from 'rxjs';
import { UserAlertService } from '../user-alert/user-alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songsUrl = 'https://trg-friends-songs-api.herokuapp.com/songs/api/search?query=';
  // private songsUrl = 'http://localhost:8080/songs/api/search?query=';

  constructor(private http: HttpClient, private userAlertService: UserAlertService) { }

  getSongs(searchQuery: string) {
    // this.log('fetched songs');
    return this.http.get(this.songsUrl + searchQuery)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError('getSongs', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead 
      // TODO: better job of transforming error for user consumption
      this.userAlertService.write('Error accessing API. Please try again later.');
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
