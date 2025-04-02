import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieApiService } from './movie-api.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService, MovieApiService],
})
export class MoviesModule {}
