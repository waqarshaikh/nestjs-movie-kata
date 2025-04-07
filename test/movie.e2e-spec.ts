import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('http://localhost:3030/movies/Titanic', () => {
    return HttpResponse.json({
      releaseDate: '1997-12-19',
      budget: 200,
      made: 220,
      rating: 8,
    });
  }),
  http.get('http://localhost:3030/movies/Avatar', () => {
    return HttpResponse.json({
      releaseDate: '2009-12-18',
      budget: 200,
      made: 100,
      rating: 6,
    });
  }),
  http.get('http://localhost:3030/movies/TheGodfather', () => {
    return HttpResponse.json({
      releaseDate: '1972-03-24',
      budget: 100,
      made: 100,
      rating: 9,
    });
  }),
);

describe('Movie E2E should', () => {
  let app: INestApplication;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 90s', () => {
    request(app.getHttpServer())
      .get('/Titanic/oldness')
      .expect(200)
      .expect('90s');
  });

  it('/movie/Avatar/oldness (GET) should return NEW', () => {
    request(app.getHttpServer())
      .get('/Avatar/oldness')
      .expect(200)
      .expect('NEW');
  });

  it('/movie/TheGodfather/oldness (GET) should return OLD', () => {
    request(app.getHttpServer())
      .get('/TheGodfather/oldness')
      .expect(200)
      .expect('OLD');
  });

  it('/movie/Titanic/profitable (GET) should return PROFITABLE', () => {
    request(app.getHttpServer())
      .get('/Titanic/profitable')
      .expect(200)
      .expect('PROFITABLE');
  });

  it('/movie/Avatar/profitable (GET) should return NONPROFITABLE', () => {
    request(app.getHttpServer())
      .get('/Avatar/profitable')
      .expect(200)
      .expect('NONPROFITABLE');
  });

  it('/movie/Titanic/rating (GET) should return 4', () => {
    request(app.getHttpServer()).get('/Titanic/rating').expect(200).expect('4');
  });

  it('/movie/Avatar/rating (GET) should return 3', () => {
    request(app.getHttpServer())
      .get('/movie/Avatar/rating')
      .expect(200)
      .expect('3');
  });

  it('/movie/TheGodfather/rating (GET) should return 4.5', () => {
    request(app.getHttpServer())
      .get('/movie/TheGodfather/rating')
      .expect(200)
      .expect('4.5');
  });
});
