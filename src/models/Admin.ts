export class Admin {
  private _user: string;

  private _senha: string;

  constructor(user: string, senha: string) {
    this._user = user;
    this._senha = senha;
  }

  public get user(): string {
    return this._user;
  }
  public set user(value: string) {
    this._user = value;
  }

  public get senha(): string {
    return this._senha;
  }
  public set senha(value: string) {
    this._senha = value;
  }
}
