import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'http';
import * as process from 'process';

export class SocketAdapter extends IoAdapter {
	createIOServer(
		port: number,
		options?: ServerOptions & {
			namespace?: string;
			server?: any;
		},
	) {
		const server = super.createIOServer(port, {
			...options,
			cors: {
				origin: process.env.CLIENT_URL,
				methods: ['GET', 'POST'],
			},
		});
		return server;
	}
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: process.env.CLIENT_URL,
	});
	app.useWebSocketAdapter(new SocketAdapter(app));
	await app.listen(3000);
}

bootstrap();
