import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyMovieServiceService {

  private REST_API_SERVER = "https://apimymovie.azurewebsites.net/api";

  constructor(private httpClient: HttpClient) { }

  public getMovies() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public createMovie(data_movie) {
    return this.httpClient.post(this.REST_API_SERVER + '/add', data_movie);
  }

  public getMovieGender(data_search) {
    let { Gender, IMDB, MetaScore, Community_Score, Favorite, Popularity } = data_search;
    return this.httpClient.get(this.REST_API_SERVER + '/gender/' + Gender + '/' + IMDB + '/' + MetaScore + '/' + Community_Score + '/' + Favorite + '/' + Popularity);
  }

  public getMovieSearch(search) {
    return this.httpClient.get(this.REST_API_SERVER + '/search/' + search);
  }

  public updateMovie(data_movie) {
    return this.httpClient.put(this.REST_API_SERVER + '/modify', data_movie);
  }

  public addComment(data_movie) {
    return this.httpClient.post(this.REST_API_SERVER + '/add_comment', data_movie);
  }
}
