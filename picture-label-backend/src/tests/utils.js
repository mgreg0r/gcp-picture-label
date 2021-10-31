import {jest} from '@jest/globals';

export const USERNAME = 'test@example.com';

export const mockReq = () => ({
  session: {}
});

export const mockAuthReq = () => ({
  session: {
    user: USERNAME,
    destroy: jest.fn()
  }
});

class Res {
  status(s) {
    this.code = s;
    return this;
  }

  json(j) {
    this.data = j;
    return this;
  }

  send(d) {
    this.data = d;
    return this;
  }

  end() {
    return this;
  }
}

export const mockRes = () => new Res();
