import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          const errorMessage =
            error.error?.message || 'An unknown error occurred!';

          switch (error.status) {
            case 400:
              if (error.error.errors) {
                this.toastr.error(error.error.errors[0], 'Validation Error');
              } else {
                this.toastr.error(errorMessage, 'Bad Request');
              }
              break;
            case 401:
              this.toastr.error(errorMessage, 'Unauthorized');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              // Mostrar el mensaje del error interno directamente
              this.toastr.error(errorMessage, 'Internal Server Error');
              break;
            default:
              this.toastr.error(errorMessage, 'Error');
              break;
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
