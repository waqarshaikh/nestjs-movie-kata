import { beforeAll, describe } from 'vitest';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';
import { MoviesModule } from '../src/movie/movie.module';

describe('Movie E2E Tests should', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get the oldness of a movie', async () => {
    server.use(
      http.get('/movies/Titanic', () =>
        HttpResponse.json({
          name: 'Titanic',
          releasedOn: '1997-12-19T00:00:00.000Z',
        }),
      ),
    );

    const response = await request(app.getHttpServer())
      .get('/Titanic/oldness')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBe('90s');
  });

  it('get the profitability of a movie', async () => {
    server.use(
      http.get('/movies/Titanic', () =>
        HttpResponse.json({
          name: 'Titanic',
          releasedOn: '1997-12-19T00:00:00.000Z',
          budget: 200000000,
          made: 220000000,
        }),
      ),
    );

    const response = await request(app.getHttpServer())
      .get('/Titanic/profitable')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBe('PROFITABLE');
  });
});
