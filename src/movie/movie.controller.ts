import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {
    console.log('MovieController constructor called');
  }

  @Get('/:movieName/oldness')
  getOldness(@Param('movieName') movieName: string): any {
    return this.movieService.findOldness(movieName);
  }

  @Get('/:movieName/profitable')
  async getProfitability(@Param('movieName') movieName: string) {
    const profitability = await this.movieService.getProfitability(movieName);
    return { revenue: profitability };
  }
}