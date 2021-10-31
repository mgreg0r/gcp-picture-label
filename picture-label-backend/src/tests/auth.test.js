import sinon from 'sinon';
import {mockAuthReq, mockReq, mockRes, USERNAME} from "./utils";
import gauth from '../auth/google';
import {authMeHandler, googleAuthHandler, logoutHandler} from "../auth/handlers";


describe('/auth/me handler', () => {
  it('returns 401 if user is not authenticated', async () => {
    const res = mockRes();
    await authMeHandler(mockReq(), res);
    expect(res.code).toEqual(401);
  });

  it('returns authenticated user if exists', async () => {
    const res = mockRes();
    await authMeHandler(mockAuthReq(), res);
    expect(res.code).toEqual(200);
    expect(res.data).toEqual({email: USERNAME})
  })
});

describe('/auth/logout handler', () => {
  it('returns 401 if user is not authenticated', async () => {
    const res = mockRes();
    await logoutHandler(mockReq(), res);
    expect(res.code).toEqual(401);
  });

  it('destroys session and returns 204 if user is authenticated', async () => {
    const res = mockRes();
    const req = mockAuthReq();
    await logoutHandler(req, res);
    expect(res.code).toEqual(204);
    expect(req.session).toBeNull();
  })
});

describe('/auth/login handler', () => {
  it('calls oauth api and stores session', async () => {
    const res = mockRes();
    const req = mockReq();
    req.body = {
      token: 'abc'
    };

    const stub = sinon.stub(gauth, 'authenticate').returns(USERNAME);

    await googleAuthHandler(req, res);
    expect(res.code).toEqual(200);
    expect(req.session.user).toEqual(USERNAME);
    expect(res.data.email).toEqual(USERNAME);

    stub.restore();
  });

  it('returns 401 if google authentication fails', async () => {
    const res = mockRes();
    const req = mockReq();
    req.body = {
      token: 'abc'
    };

    const stub = sinon.stub(gauth, 'authenticate').throws({});

    await googleAuthHandler(req, res);
    expect(res.code).toEqual(401);
    expect(req.session.user).toBeFalsy();

    stub.restore();
  });
});
