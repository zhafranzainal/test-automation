import usersData from './users.json';

export interface TestUser {
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Validates that every entry in the data file has the minimum required
 * fields. Fails fast at suite startup with a clear error, rather than
 * letting a typo in the data file surface as a confusing test failure.
 * (Uses a generic so callers keep the precise per-key shape inferred
 * from users.json, e.g. validCustomer1.fullName stays "string", not
 * "string | undefined".)
 */
function validate<T extends Record<string, TestUser>>(data: T): T {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value.email !== 'string' || !value.email) {
      throw new Error(`[data/users.json] Entry "${key}" is missing a valid "email" field.`);
    }
    if (typeof value.password !== 'string' || !value.password) {
      throw new Error(`[data/users.json] Entry "${key}" is missing a valid "password" field.`);
    }
  }

  return data;
}

// Testers can edit data/users.json directly without code changes
export const testUsers = validate(usersData);
