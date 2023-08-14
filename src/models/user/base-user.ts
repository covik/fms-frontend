import { z } from 'zod';

const userValidator = z.object({
  id: z.number().gte(1),
  email: z.string().email(),
  fullName: z.string().min(1),
  userLimit: z.number(),
});

export type BaseUserAttributes = z.infer<typeof userValidator>;

export abstract class BaseUser {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _fullName: string;
  private readonly _userLimit: number;

  public constructor(attributes: BaseUserAttributes) {
    const { id, email, fullName, userLimit } = userValidator.parse(attributes);
    this._id = id;
    this._email = email;
    this._fullName = fullName;
    this._userLimit = userLimit;
  }

  public id(): number {
    return this._id;
  }

  public email(): string {
    return this._email;
  }

  public fullName(): string {
    return this._fullName;
  }

  public userLimit(): number {
    return this._userLimit;
  }
}
