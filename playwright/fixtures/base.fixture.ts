import { test as playwrightTest } from '@playwright/test';

export const test = playwrightTest.extend({
    context: async ({ context }, use) => {
        await context.addInitScript(
            "setTimeout(() => window.__pw_resume && window.__pw_resume(), 500)"
        );
        await use(context);
    },
});

export { expect } from '@playwright/test';
