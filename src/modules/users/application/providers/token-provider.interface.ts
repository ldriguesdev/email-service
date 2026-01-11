export interface IPayload {
  sub: string; 
  email: string;
}

export abstract class ITokenProvider {
  abstract generateAccessToken(payload: IPayload): string;
  abstract generateRefreshToken(payload: IPayload): string;
  abstract verify(token: string): IPayload;
}