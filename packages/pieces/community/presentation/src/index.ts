import { createPiece } from '@activepieces/pieces-framework';
import { generatePresentations } from './lib/actions/generate-presentations';
import { generatePresentationV3 } from './lib/actions/generate-presentation-v3';
import { getAsyncTaskStatus } from './lib/actions/get-async-task-status';
import { exportPresentation } from './lib/actions/export-presentation';
import { generateOutline } from './lib/actions/generate-outline';
import { listPresentations } from './lib/actions/list-presentations';
import { listSmartDesigns } from './lib/actions/list-smart-designs';
import { listStandardTemplates } from './lib/actions/list-standard-templates';
import { uploadSourceFiles } from './lib/actions/upload-source-files';

import { presentonAuth } from './lib/common/auth';
import { PieceCategory } from '@activepieces/pieces-framework';
import { newPresentation } from './lib/triggers/new-presentation';
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const presentation = createPiece({
  displayName: 'Presenton',
  description:
    'Generate AI-powered presentations using Presenton (https://presenton.ai). Supports templates, themes, images, synchronous and asynchronous generation, status polling, and export to PPTX/PDF.',
  auth: presentonAuth,
  minimumSupportedRelease: '0.88.2',
  logoUrl: 'https://cdn.activepieces.com/pieces/presenton.png',
  categories: [
    PieceCategory.ARTIFICIAL_INTELLIGENCE,
    PieceCategory.CONTENT_AND_FILES,
  ],
  authors: ['sanket-a11y'],
  actions: [
    generatePresentations,
    generatePresentationV3,
    getAsyncTaskStatus,
    exportPresentation,
    generateOutline,
    listPresentations,
    listSmartDesigns,
    listStandardTemplates,
    uploadSourceFiles,
    createCustomApiCallAction({
      auth: presentonAuth,
      baseUrl: () => 'https://api.presenton.ai/api/v1',
      authMapping: async (auth) => {
        return {
          Authorization: `Bearer ${auth.secret_text}`,
        };
      },
    }),
  ],
  triggers: [newPresentation],
});
