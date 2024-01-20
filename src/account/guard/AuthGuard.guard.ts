import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import express from 'express';

export class AuthenticatorGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request: any = context.switchToHttp().getRequest();
        const response: express.Response = context.switchToHttp().getResponse();

        if(!request.session!.user) {
            response.redirect('../auth/sign-in')
            return false;
        }
        return true;
    }
}