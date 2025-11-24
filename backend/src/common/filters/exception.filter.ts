import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '@common/interfaces/api-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          message = message || 'Invalid request data';
          break;
        case HttpStatus.UNAUTHORIZED:
          message = message || 'Unauthorized access';
          break;
        case HttpStatus.FORBIDDEN:
          message = message || 'Access forbidden';
          break;
        case HttpStatus.NOT_FOUND:
          message = message || 'Resource not found';
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          message = message || 'Internal server error';
          break;
        default:
          break;
      }
    } else {
      console.error(exception); // Log lỗi để debug
    }

    const errorResponse: ApiResponse<null> = {
      status: 'error',
      message,
      data: null,
      meta: {
        statusCode: status,
        timestamp: new Date().toISOString(),
      },
    };
    response.status(status).json(errorResponse);
  }
}
