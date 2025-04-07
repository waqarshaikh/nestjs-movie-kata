import { Injectable, Scope } from '@nestjs/common';
import { MovieApiService } from './movie-api.service';
import { Movie } from './movie';

@Injectable({ scope: Scope.REQUEST })
export class MovieService {
  constructor(private movieApiService: MovieApiService) {
    console.log('MovieService constructor called');
  }

  async findOldness(movieName: string) {
    const movie: Movie = await this.movieApiService.getMovie(movieName);
    const year = this.parseYear(movie.date);

    if (year >= 2000) {
      return 'NEW';
    } else if (year >= 1990) {
      return '90s';
    } else {
      return 'OLD';
    }
  }

  async getProfitability(movieName: string) {
    const movie: Movie = await this.movieApiService.getMovie(movieName);
    const profit = movie.made - movie.budget;

    if (profit > 100) {
      return 'BLOCKBUSTER';
    } else if (profit >= 0) {
      return 'PROFITABLE';
    } else {
      return 'NONPROFITABLE';
    }
  }

  private parseYear(releaseDate: string) {
    return parseInt(releaseDate.split('-')[0]);
  }
}
