import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: any;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        if (this.shouldSkipWrapping(request)) {
          return data;
        }

        if (data === null || data === undefined) {
          return {
            success: true,
            timestamp: new Date().toISOString(),
          };
        }

        const response: Response<T> = {
          success: true,
          timestamp: new Date().toISOString(),
        };

        if (typeof data === 'object') {
          if (data.meta) {
            response.meta = data.meta;
            response.data = data.data;
          } else {
            response.data = data;
          }
        } else {
          response.data = data;
        }

        return response;
      }),
    );
  }

  private shouldSkipWrapping(request: any): boolean {
    const path = request.url;

    if (path.includes('api-docs')) {
      return true;
    }

    if (path.includes('health')) {
      return true;
    }

    return false;
  }
}
