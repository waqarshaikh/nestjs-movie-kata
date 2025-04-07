import { Controller, Get, Param, Scope } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller({ scope: Scope.REQUEST })
export class MovieController {
  constructor(private movieService: MovieService) {
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
