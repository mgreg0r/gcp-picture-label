import sinon from 'sinon';
import storage from '../storage';
import vision from '../images/vision';
import {getImageHandler, labelImageHandler} from "../images/image";
import {mockAuthReq, mockReq, mockRes} from "./utils";
import {uploadHandler} from "../images/upload";

describe('/image/:id handler', () => {
  let stub;

  beforeEach(() => {
    stub = sinon.stub(storage, 'getImage');
    stub.withArgs('123').returns('url');
  });

  afterEach(() => {
    stub.restore();
  });

  it('returns 401 if user is not authenticated', async () => {
    const res = mockRes();
    await getImageHandler(mockReq(), res);
    expect(res.code).toEqual(401);
  });

  it('returns requested image url', async () => {
    const res = mockRes();
    const req = mockAuthReq();
    req.params = {
      id: '123'
    };

    await getImageHandler(req, res);
    expect(res.code).toEqual(200);
    expect(res.data.src).toEqual('url');
    expect(res.data.id).toEqual('123');
  });

  it('returns 404 for non existing image', async () => {
    const res = mockRes();
    const req = mockAuthReq();
    req.params = {
      id: 'aaa'
    };

    await getImageHandler(req, res);
    expect(res.code).toEqual(404);
  })
});

describe('/generate/:id handler', () => {
  let storageStub, visionStub;

  beforeEach(() => {
    storageStub = sinon.stub(storage, 'getImage');
    storageStub.withArgs('123').returns('url');
    visionStub = sinon.stub(vision, 'labelImage');
    visionStub.withArgs('url').returns(['a', 'b', 'c']);
    visionStub.withArgs(undefined).throws({});
  });

  afterEach(() => {
    storageStub.restore();
    visionStub.restore();
  });

  it('returns 401 if user is not authenticated', async () => {
    const res = mockRes();
    await labelImageHandler(mockReq(), res);
    expect(res.code).toEqual(401);
  });

  it('returns labels for requested image', async () => {
    const res = mockRes();
    const req = mockAuthReq();
    req.params = {
      id: '123'
    };

    await labelImageHandler(req, res);
    expect(res.code).toEqual(200);
    expect(res.data).toEqual(['a', 'b', 'c']);
  });

  it('returns 404 for not existing image', async () => {
    const res = mockRes();
    const req = mockAuthReq();
    req.params = {
      id: 'aaa'
    };

    await labelImageHandler(req, res);
    expect(res.code).toEqual(404);
  })
});

describe('/upload handler', () => {
  it('returns 401 if user is not authenticated', async () => {
    const res = mockRes();
    await uploadHandler(mockReq(), res);
    expect(res.code).toEqual(401);
  });

  it('uploads an image', async () => {
    const req = mockAuthReq();
    const res = mockRes();
    req.file = 'abc';

    const stub = sinon.stub(storage, 'saveImage');
    stub.withArgs('abc').returns('imageId');

    await uploadHandler(req, res);

    expect(res.code).toEqual(200);
    expect(res.data.imageId).toEqual('imageId');

    stub.restore();
  });

  it('returns 400 for an invalid image', async () => {
    const req = mockAuthReq();
    const res = mockRes();
    req.file = 'abc';

    const stub = sinon.stub(storage, 'saveImage');
    stub.withArgs('abc').throws({code: 400});

    await uploadHandler(req, res);

    expect(res.code).toEqual(400);

    stub.restore();
  });
});
