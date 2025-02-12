export class AuthPayloadRegisterDto {
  authId: string;
  fullName: string;
  phoneNumber: string | null;
  email: string;
  username: string;
}

export class AuthPayloadGetUser {
  authId: string;
  username: string;
}
