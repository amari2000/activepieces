import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';

export const exportPresentation = createAction({
  auth: presentonAuth,
  name: 'presentation_export_presentation',
  classification: 'WRITE',
  displayName: 'Export Presentation',
  description: 'Export an existing Presenton presentation to PPTX, PDF, or PNG.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Exports a finished presentation identified by its id to PPTX, PDF, or PNG and returns a download path. Use once a presentation is complete (e.g. after "Get Async Task Status" reports it finished). Not idempotent: each call consumes credits and can generate a new export file.',
    idempotent: false,
  },
  props: {
    presentation_id: Property.ShortText({
      displayName: 'Presentation id',
      description: 'The id of the presentation to export.',
      required: true,
    }),
    export_as: Property.StaticDropdown({
      displayName: 'Export as',
      description: 'Export format.',
      required: true,
      defaultValue: 'pptx',
      options: {
        options: [
          { value: 'pptx', label: 'PPTX' },
          { value: 'pdf', label: 'PDF' },
          { value: 'png', label: 'PNG' },
        ],
      },
    }),
  },
  async run({ auth, propsValue }) {
    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/presentation/export',
      body: {
        id: propsValue.presentation_id,
        export_as: propsValue.export_as,
      },
    });
  },
});
