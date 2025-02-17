export class AuthPayloadRegisterDto {
  authId: string;
  fullname: string;
  tags: string[];
}

export class AuthPayloadGetUser {
  authId: string;
}
