import { test as playwrightTest, APIRequestContext, APIResponse } from '@playwright/test';

const SENSITIVE_FIELDS = ['password'];

function redact(data: unknown): unknown {
    if (!data || typeof data !== 'object') return data;
    const clone: Record<string, unknown> = { ...(data as Record<string, unknown>) };
    for (const key of SENSITIVE_FIELDS) {
        if (key in clone) clone[key] = '***REDACTED***';
    }
    return clone;
}

const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch', 'head'] as const;

export const test = playwrightTest.extend<{ request: APIRequestContext }>({

    context: async ({ context }, use) => {
        await context.addInitScript(
            "setTimeout(() => window.__pw_resume && window.__pw_resume(), 500)"
        );
        await use(context);
    },

    request: async ({ request }, use, testInfo) => {

        let callCount = 0;

        const wrapped = new Proxy(request, {
            get(target, prop: string, receiver) {

                if (!HTTP_METHODS.includes(prop as typeof HTTP_METHODS[number])) {
                    return Reflect.get(target, prop, receiver);
                }

                return async (url: string, options?: Record<string, any>) => {

                    const response: APIResponse = await (target as any)[prop](url, options);

                    callCount++;
                    const label = `${testInfo.title}${callCount > 1 ? ` #${callCount}` : ''}`;

                    await testInfo.attach(`${label} - Request`, {
                        body: JSON.stringify(
                            {
                                method: prop.toUpperCase(),
                                url,
                                body: redact(options?.form ?? options?.data ?? options?.params),
                            },
                            null,
                            2
                        ),
                        contentType: 'application/json',
                    });

                    let responseBody: string;
                    try {
                        responseBody = JSON.stringify(await response.json(), null, 2);
                    } catch {
                        responseBody = await response.text();
                    }

                    await testInfo.attach(`${label} - Response (HTTP ${response.status()})`, {
                        body: responseBody,
                        contentType: 'application/json',
                    });

                    return response;

                };

            },
        });

        await use(wrapped as APIRequestContext);

    },

});

export { expect } from '@playwright/test';
