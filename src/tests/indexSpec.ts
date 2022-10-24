import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('Image Processing API test', () => {
  it('Testing the home route.', async () => {
    const res = await req.get('/api');
    expect(res.status).toBe(200);
  });

  it('Passing no filename in the url parameters.', async () => {
    const res = await req.get('/api/images');
    expect(res.status).toBe(400);
  });

  it('Passing a filename that does not exist.', async () => {
    const res = await req.get(
      '/api/images?filename=ThisIsANameIJustMadeUp&width=100&height=100'
    );
    expect(res.status).toBe(404);
  });

  it('Passing a filename that exists, but no width or height, should return the original image.', async () => {
    const res = await req.get('/api/images?filename=palmtunnel');
    expect(res.status).toBe(200);
  });

  it('Passing a filename that exists and has been called before, so it is cached.', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=100&height=100'
    );
    expect(res.status).toBe(302);
  });

  it('Passing a filename that exists (and not cached) and both width and height parameters.', async () => {
    const res = await req.get(
      '/api/images?filename=icelandwaterfall&width=100&height=100'
    );
    expect(res.status).toBe(201);
  });

  it('Passing a correct filename for the first time but with missing height or width parameter.', async () => {
    const res = await req.get('/api/images?filename=santamonica&height=100');
    expect(res.status).toBe(400);
  });
});
