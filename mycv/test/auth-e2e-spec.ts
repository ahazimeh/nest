import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from 'src/setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app)
    await app.init();
  });

  it('handles a signup request', () => {
    const email1 = 'safdsfdsfds@sdfs2.com'
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({ email: email1, password: 'asdfgds' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email1)
      })
    //   .expect('Hello World!');
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdsad@sdfsda.com'

    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({ email, password: 'asdfasdf' })
    .expect(201)

    const cookie = res.get('Set-Cookie')

    const { body } = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie', cookie)
    .expect(200)

    expect(body.email).toEqual(email)
  })
});
