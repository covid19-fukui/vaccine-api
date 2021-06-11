import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { VaccineModule } from './vaccine.module';

async function bootstrap() {
  const app = await NestFactory.create(VaccineModule);

  const options = new DocumentBuilder()
    .setTitle('ワクチン接種状況取得API')
    .setDescription(
      '新型コロナワクチンの接種状況の統計データを福井県を軸に集計したデータを提供',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();