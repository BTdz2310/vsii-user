export class AuthPayloadRegisterDto {
  authId: string;
  fullName: string;
  tags: string[];
}

export class AuthPayloadGetUser {
  authId: string;
  username: string;
}
