import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService,
                private route: Router,
                private alertify: AlertifyService,
                private authService: AuthService) {}


    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService
            .getMessages(
            this.authService.decodedToken.nameId,
            this.pageNumber,
            this.pageSize,
            this.messageContainer
            )
            .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.route.navigate(['/home']);
                return of(null);
            })
        );
    }
}
