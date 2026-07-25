import { APIResponse, TestInfo } from '@playwright/test';

export async function attachResponse(
    response: APIResponse,
    testInfo: TestInfo,
    label = 'Response body'
) {

    let body: string;

    try {
        body = JSON.stringify(await response.json(), null, 2);
    } catch {
        body = await response.text();
    }

    await testInfo.attach(`${label} (HTTP ${response.status()})`, {
        body,
        contentType: 'application/json',
    });

}
