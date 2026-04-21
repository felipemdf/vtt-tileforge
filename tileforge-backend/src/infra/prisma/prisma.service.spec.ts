import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

jest.mock('./generated/prisma/client', () => ({
  PrismaClient: jest.fn(function PrismaClientMock(this: {
    $connect: jest.Mock;
    $disconnect: jest.Mock;
  }) {
    this.$connect = jest.fn().mockResolvedValue(undefined);
    this.$disconnect = jest.fn().mockResolvedValue(undefined);
  }),
}));

describe('PrismaService', () => {
  let service: PrismaService;
  let $connect: jest.Mock;
  let $disconnect: jest.Mock;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    $connect = jest.mocked(
      Reflect.get(service as object, '$connect') as jest.Mock,
    );

    $disconnect = jest.mocked(
      Reflect.get(service as object, '$disconnect') as jest.Mock,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    await service.onModuleInit();

    expect($connect).toHaveBeenCalled();
  });

  it('should call $disconnect on module destroy', async () => {
    await service.onModuleDestroy();

    expect($disconnect).toHaveBeenCalled();
  });
});
