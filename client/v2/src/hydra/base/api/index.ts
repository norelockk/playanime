import { Store, useStore } from 'vuex';

import { ApiResponse } from '../../../typings/types';
import { AuthorizationApiLoginData, AuthorizationApiRegisterData } from '../../../typings/interfaces';

import HttpApi from './http';
import { isEmpty } from 'lodash';

export class AuthorizationApi extends HttpApi {
  private readonly store: Store<any> = useStore();

  // Authenticating
  public async login(data: AuthorizationApiLoginData): Promise<ApiResponse> {
    if (this.store.getters['user/logged']) return null;

    return await this.send('/users/login', data);
  }

  public async register(data: AuthorizationApiRegisterData): Promise<ApiResponse> {
    if (this.store.getters['user/logged']) return null;

    return await this.send('/users', data);
  }

  // Sessions
  public async logout(): Promise<ApiResponse> {
    if (!this.store.getters['user/logged']) return null;

    return await this.send('/users/logout', {});
  }

  public async verify(): Promise<ApiResponse> {
    return await this.fetch('/users/me');
  }
}

export class UsersApi extends HttpApi {
  // private readonly store: Store<any> = useStore();

  public async getUserById(id: string): Promise<ApiResponse> {
    if (typeof id !== 'string') return null;
    if (isEmpty(id)) return null;

    return await this.fetch('/users/' + id);
  }
}