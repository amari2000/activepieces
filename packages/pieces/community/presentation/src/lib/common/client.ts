import { HttpMethod, httpClient } from '@activepieces/pieces-common';

export const BASE_URL = `https://api.presenton.ai/api/v1`;
export const BASE_URL_V3 = `https://api.presenton.ai/api/v3`;

export async function makeRequest(
  api_key: string,
  method: HttpMethod,
  path: string,
  body?: unknown
) {
  try {
    const response = await httpClient.sendRequest({
      method,
      url: `${BASE_URL}${path}`,
      headers: {
        Authorization: `Bearer ${api_key}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    return response.body;
  } catch (error: any) {
    throw new Error(`Unexpected error: ${error.message || String(error)}`);
  }
}

export async function makeRequestV3({
  apiKey,
  method,
  path,
  body,
  queryParams,
  headers,
}: {
  apiKey: string;
  method: HttpMethod;
  path: string;
  body?: unknown;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
}) {
  try {
    const response = await httpClient.sendRequest({
      method,
      url: `${BASE_URL_V3}${path}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(headers ?? {}),
      },
      queryParams,
      body,
    });
    return response.body;
  } catch (error: any) {
    throw new Error(`Unexpected error: ${error.message || String(error)}`);
  }
}
