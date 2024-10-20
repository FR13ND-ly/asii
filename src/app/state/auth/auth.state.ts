export interface AuthState {
  uid: any;
  username: string;
}

export const initialAuthState: AuthState = {
  uid: undefined,
  username: '',
};

export const notAuth = {
  uid: false,
  username: '',
};
