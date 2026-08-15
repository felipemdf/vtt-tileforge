import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { AppService } from '@/app.service';

describe('AppModule', () => {
  it('boots the worker module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module.get(AppService)).toBeDefined();
    await module.close();
  });
});
