import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3001', // Frontend dev
      'http://localhost:3000', // Frontend dev (alternative port)
      'https://expenz-frontend.vercel.app', // Production frontend
      'https://expenz.vercel.app', // Alternative production URL
      'https://expenz.onrender.com', // Render frontend (if needed)
    ],
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
