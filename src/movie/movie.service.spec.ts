import { MovieService } from './movie.service';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';
import { MovieApiService } from './movie-api.service';
import { Movie } from './movie';

describe('Movie Service should', () => {
  let service: MovieService;
  let movieApiService: DeepMockProxy<MovieApiService>;

  beforeEach(() => {
    movieApiService = mockDeep<MovieApiService>();
    service = new MovieService(movieApiService);
  });

  it('return NEW for year >= 2000', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(
        new Movie('Titanic', '2000-01-01T00:00:00Z', 200, 180, 8),
      ),
    );

    const result = await service.findOldness('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe('NEW');
  });

  it('return 90s for year >= 90', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Avatar', '1997-01-01T00:00:00Z', 200, 200, 8)),
    );

    const result = await service.findOldness('Avatar');

    expect(result).toBeDefined();
    expect(result).toBe('90s');
  });

  it('return OLD for year < 90', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Island', '1985-01-01T00:00:00Z', 200, 200, 8)),
    );

    const result = await service.findOldness('Island');

    expect(result).toBeDefined();
    expect(result).toBe('OLD');
  });

  it('return PROFITABLE for made >= budget', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('', '1985-01-01T00:00:00Z', 100, 200, 8)),
    );

    const result = await service.getProfitability('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe('PROFITABLE');
  });

  it('return NOT PROFITABLE for made < budget', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Island', '1985-01-01T00:00:00Z', 100, 90, 8)),
    );

    const result = await service.getProfitability('Island');

    expect(result).toBeDefined();
    expect(result).toBe('NONPROFITABLE');
  });

  it('return BLOCKBUSTER for budget >= made', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Titanic', '1985-01-01T00:00:00Z', 80, 190, 8)),
    );

    const result = await service.getProfitability('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe('BLOCKBUSTER');
  });

  it('return rating 4 for movie rating 8', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Titanic', '1985-01-01T00:00:00Z', 80, 190, 8)),
    );

    const result = await service.getRatings('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe(4);
  });

  it('return rating 3 for movie rating 6', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Titanic', '1985-01-01T00:00:00Z', 80, 190, 6)),
    );

    const result = await service.getRatings('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe(3);
  });

  it('return rating 2 for movie rating 4', async () => {
    movieApiService.getMovie.mockReturnValueOnce(
      Promise.resolve(new Movie('Titanic', '1985-01-01T00:00:00Z', 80, 190, 4)),
    );

    const result = await service.getRatings('Titanic');

    expect(result).toBeDefined();
    expect(result).toBe(2);
  });
});
