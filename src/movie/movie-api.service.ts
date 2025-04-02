import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Movie } from './movie';
import { AxiosResponse } from 'axios';

@Injectable()
export class MovieApiService {
  constructor(private httpService: HttpService) {}

  async getMovie(movieName: string): Promise<Movie> {
    const url = `http://localhost:3030/movies/${movieName}`;
    const observable: Observable<Movie> = this.httpService
      .get(url)
      .pipe(map((res: AxiosResponse<Movie, any>): Movie => res?.data));
    return lastValueFrom(observable);
  }
}
