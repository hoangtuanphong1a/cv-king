import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@common/interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T> | T> {
    return next.handle().pipe(
      map(data => {
        // Nếu dữ liệu đã là ApiResponse, trả về nguyên vẹn
        if (
          data &&
          typeof data === 'object' &&
          'status' in data &&
          'message' in data &&
          'data' in data
        ) {
          return data;
        }
        // Nếu không, áp dụng định dạng ApiResponse mặc định
        return {
          status: 'success',
          message: 'Request successful',
          data,
          meta: {},
        };
      })
    );
  }
}
