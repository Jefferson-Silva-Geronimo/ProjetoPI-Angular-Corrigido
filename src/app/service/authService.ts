import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, senha: string, isAdmin: boolean): boolean {
    if (email === 'admin@hypedunk.com' && senha === '123456' && isAdmin) {
      return true;
    }
    return false;
  }
}
