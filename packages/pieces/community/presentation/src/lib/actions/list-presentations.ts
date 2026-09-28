import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { presentationListPresentationsOutputSchema } from '../output-schemas';

export const listPresentations = createAction({
  auth: presentonAuth,
  name: 'presentation_list_presentations',
  outputSchema: presentationListPresentationsOutputSchema,
  classification: 'SEARCH',
  displayName: 'List Presentations',
  description: 'List presentations stored in the connected Presenton account.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Lists presentations stored in the connected Presenton account, most recent first, with pagination. Use to find an existing presentation id (e.g. to export it) without creating a new one. Idempotent: re-reading the same page returns the same results.',
    idempotent: true,
  },
  props: {
    page: Property.Number({
      displayName: 'Page',
      description: 'Page number (starts at 1).',
      required: false,
      defaultValue: 1,
    }),
    page_size: Property.Number({
      displayName: 'Page size',
      description: 'Number of results per page.',
      required: false,
      defaultValue: 20,
    }),
  },
  async run({ auth, propsValue }) {
    const queryParams: Record<string, string> = {};
    if (propsValue.page !== undefined) queryParams['page'] = String(propsValue.page);
    if (propsValue.page_size !== undefined)
      queryParams['page_size'] = String(propsValue.page_size);

    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.GET,
      path: '/presentation/all',
      queryParams,
    });
  },
});
