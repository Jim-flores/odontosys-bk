import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Reflector } from "@nestjs/core";

export interface Response<T> {
  success: boolean;
  statusCode: number;
  data?: T;
  message?: string;
  meta?: any;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const httpResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (this.shouldSkipWrapping(request)) {
          return data;
        }

        const customMessage = this.reflector.get<string>(
          "response_message",
          context.getHandler(),
        );
        const response: Response<T> = {
          success: true,
          statusCode: httpResponse.statusCode,
          message:
            customMessage || this.getDefaultMessage(httpResponse.statusCode),
          timestamp: new Date().toISOString(),
        };

        if (data !== null && data !== undefined) {
          if (typeof data === "object" && data.meta) {
            response.meta = data.meta;
            response.data = data.data;
          } else {
            response.data = data;
          }
        }

        return response;
      }),
    );
  }
  private getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case 201:
        return "Creado exitosamente";

      case 200:
        return "Operación exitosa";

      default:
        return "Proceso completado";
    }
  }
  private shouldSkipWrapping(request: any): boolean {
    const path = request.url;

    if (path.includes("api-docs")) {
      return true;
    }

    if (path.includes("health")) {
      return true;
    }

    return false;
  }
}
