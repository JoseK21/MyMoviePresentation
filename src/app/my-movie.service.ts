import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyMovieServiceService {

  private REST_API_SERVER = "http://localhost:5000/api";

  constructor(private httpClient: HttpClient) { }

  public getMovies() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public createMovie(data_movie) {
    return this.httpClient.post(this.REST_API_SERVER + '/add', data_movie);
  }

  public getMovieGender(gender) {
    return this.httpClient.get(this.REST_API_SERVER + '/gender/' + gender);
  }

  public getMovieSearch(search) {
    return this.httpClient.get(this.REST_API_SERVER + '/search/'+ search);
  }

  public updateMovie(data_movie) {
    return this.httpClient.put(this.REST_API_SERVER + '/modify', data_movie);
  }
}
