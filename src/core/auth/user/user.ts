import { BaseUser } from './base-user';

/**
 * Class User is used to denote normal users that should have access to the application.
 * Disabled users should not be able to use the application.
 *
 * This class should be used for type annotation when you don't care if user
 * is regular user, administrator or something else.
 *
 * It can't be used for instantiating new user, StandardUser should be used instead.
 */
export abstract class User extends BaseUser {}
