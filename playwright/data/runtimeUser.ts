import { testUsers, TestUser } from './users';

/**
 * Resolves the user to log in with, for tests that support being
 * driven ad-hoc from the UI runner (see /ui-runner).
 *
 * Priority:
 *   1. RUNTIME_TEST_USER env var — a JSON string the UI runner injects
 *      when a tester submits data through the "paste JSON, click Test"
 *      form, instead of editing users.json.
 *   2. testUsers.xxx — the file-based default, so running the suite
 *      normally (`npm test`) is completely unaffected.
 */
function resolveRuntimeUser(): TestUser {

  const raw = process.env.RUNTIME_TEST_USER;

  if (!raw) {
    return testUsers.validCustomer1;
  }

  let parsed: Partial<TestUser>;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('RUNTIME_TEST_USER is set but is not valid JSON.');
  }

  if (typeof parsed.email !== 'string' || !parsed.email) {
    throw new Error('RUNTIME_TEST_USER JSON is missing a valid "email" field.');
  }
  if (typeof parsed.password !== 'string' || !parsed.password) {
    throw new Error('RUNTIME_TEST_USER JSON is missing a valid "password" field.');
  }

  return {
    email: parsed.email,
    password: parsed.password,
    fullName: parsed.fullName,
  };
}

export const runtimeUser = resolveRuntimeUser();
