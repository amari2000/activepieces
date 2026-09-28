import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { BASE_URL_V3 } from '../common/client';
import { httpClient, HttpMethod, AuthenticationType } from '@activepieces/pieces-common';
import FormData from 'form-data';
import { presentationUploadSourceFilesOutputSchema } from '../output-schemas';

export const uploadSourceFiles = createAction({
  auth: presentonAuth,
  name: 'presentation_upload_source_files',
  outputSchema: presentationUploadSourceFilesOutputSchema,
  classification: 'WRITE',
  displayName: 'Upload Source Files',
  description: 'Upload source files to Presenton for use in presentation or outline generation.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Uploads one or more files to Presenton and returns their file identifiers. Use the returned ids in the "Files" input of "Generate Presentation (v3, async)" or "Generate Outline" to ground generation in uploaded content. Not idempotent: each call stores new copies of the files.',
    idempotent: false,
  },
  props: {
    files: Property.Array({
      displayName: 'Files',
      description: 'The files to upload.',
      required: true,
      properties: {
        file: Property.File({
          displayName: 'File',
          required: true,
        }),
      },
    }),
  },
  async run({ auth, propsValue }) {
    const formData = new FormData();
    const files = propsValue.files as unknown as Array<{ file: { filename: string; data: Buffer } }>;
    for (const entry of files) {
      formData.append('files', entry.file.data, entry.file.filename);
    }

    const response = await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: `${BASE_URL_V3}/files/upload`,
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: auth.secret_text,
      },
      headers: formData.getHeaders(),
      body: formData,
    });

    return response.body;
  },
});
