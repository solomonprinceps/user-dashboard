import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, switchMap, catchError, retry } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UrlService } from '../services/url.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private message: NzMessageService, private url: UrlService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const routePath = this.activatedRoute.snapshot['_routerState'].url;

        let headers = req.headers
            .set('Content-Type', 'application/json');
        if (this.authService.isLoggedIn()) {
            const token = this.authService.getToken();
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        if (req.url.includes('profilephoto/change')) {
            headers = headers.delete('content-type');
        } else {
            headers = headers.set('Content-Type', 'application/json');
        }
        const authReq = req.clone({ headers });
        this.toggleAllButtonsDisable(true);
        return next.handle(authReq).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.toggleAllButtonsDisable(false);
                // console.log(event.body);
                if (event.body.status === 'success') {
                    // this.notification.success('Successful', event.body.message);
                } else {
                    this.message.error(event.body.message);
                }
            }
            return event;
        }), catchError((error: HttpErrorResponse) => {
            const errorStatus = error.status;
            this.toggleAllButtonsDisable(false);
            if (errorStatus === 401) {
                this.message.error(`Unauthorized! ${error.error.message}`);
                this.authService.deleteToken().then(() => {
                    if  (!routePath.toLowerCase().includes('login')) {
                        this.router.navigate(['/login'], {queryParams: {continue: this.url.getCurrentUrl()}});
                    }
                });
            } else if (errorStatus === 400) {
                this.message.error(error.error.message);
            } else if (errorStatus === 500) {
                // tslint:disable-next-line: max-line-length
                this.message.error('Something went wrong! This is likely from IT, we will fix it soon. Please try again later');
            } else if (errorStatus === 0) {
                // tslint:disable-next-line: max-line-length
                this.message.error('Unknown Error!, Please check your internet and try again later');
            } else {
                this.message.error(error.error.message || error.message);
            }
            return throwError(error);
        }));
    }

    private toggleAllButtonsDisable(value) {
        const buttons: any = document.getElementsByTagName('button');
        for (const button of buttons) {
          button.disabled = value;
        }
      }
}