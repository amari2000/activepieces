import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { presentationListSmartDesignsOutputSchema } from '../output-schemas';

export const listSmartDesigns = createAction({
  auth: presentonAuth,
  name: 'presentation_list_smart_designs',
  outputSchema: presentationListSmartDesignsOutputSchema,
  classification: 'SEARCH',
  displayName: 'List Smart Designs',
  description: 'List the smart designs available in the connected Presenton account.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Lists the smart designs (AI-generated design presets) available in the connected Presenton account, with pagination. Use to find a smart design id to pass into "Generate Presentation (v3, async)" or "Generate Outline". Idempotent: re-reading the same page returns the same results.',
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
      path: '/smart-design/all',
      queryParams,
    });
  },
});
