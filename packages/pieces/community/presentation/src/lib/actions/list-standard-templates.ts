import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { presentationListStandardTemplatesOutputSchema } from '../output-schemas';

export const listStandardTemplates = createAction({
  auth: presentonAuth,
  name: 'presentation_list_standard_templates',
  outputSchema: presentationListStandardTemplatesOutputSchema,
  classification: 'SEARCH',
  displayName: 'List Standard Templates',
  description: 'List the standard templates available in the connected Presenton account.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Lists the standard templates (fixed slide-layout sets) available in the connected Presenton account. Use to find a template id to pass into "Generate Presentation (v3, async)". Idempotent: re-reading returns the same results.',
    idempotent: true,
  },
  props: {
    include_defaults: Property.Checkbox({
      displayName: 'Include defaults',
      description: "Whether to include Presenton's built-in default templates.",
      required: false,
      defaultValue: true,
    }),
  },
  async run({ auth, propsValue }) {
    const queryParams: Record<string, string> = {};
    if (propsValue.include_defaults !== undefined)
      queryParams['include_defaults'] = String(propsValue.include_defaults);

    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.GET,
      path: '/standard-template/all',
      queryParams,
    });
  },
});
