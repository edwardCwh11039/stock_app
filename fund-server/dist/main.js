"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./filter/http-exception.filter");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:8080'],
        credentials: true,
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Fund Management')
        .setDescription('Fund Management Backend')
        .setVersion('1.0')
        .addServer('http://')
        .addTag('fm', 'fms public api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map