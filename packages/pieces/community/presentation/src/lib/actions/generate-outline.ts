import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';

export const generateOutline = createAction({
  auth: presentonAuth,
  name: 'presentation_generate_outline',
  classification: 'WRITE',
  displayName: 'Generate Outline',
  description:
    'Generate a slide-by-slide outline from content, without rendering a full presentation.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Generates a slide outline (titles and structure) from a content prompt or uploaded files, without generating full slide content or images. Use to preview or refine the structure of a deck before committing to a full "Generate Presentation" call. Not idempotent: each call can return a different outline.',
    idempotent: false,
  },
  props: {
    content: Property.LongText({
      displayName: 'Content',
      description: 'The content to generate the outline from.',
      required: false,
    }),
    instructions: Property.LongText({
      displayName: 'Instructions',
      description: 'Instruction for generating the outline (optional).',
      required: false,
    }),
    n_slides: Property.Number({
      displayName: 'Number of slides',
      description: 'Number of slides to outline.',
      required: false,
      defaultValue: 8,
    }),
    language: Property.ShortText({
      displayName: 'Language',
      description: 'Language for the outline.',
      required: false,
      defaultValue: 'English',
    }),
    design: Property.ShortText({
      displayName: 'Design id',
      description: 'Smart design id to outline against (optional).',
      required: false,
    }),
    tone: Property.StaticDropdown({
      displayName: 'Tone',
      description: 'Tone to use for the text.',
      required: false,
      defaultValue: 'default',
      options: {
        options: [
          { value: 'default', label: 'Default' },
          { value: 'casual', label: 'Casual' },
          { value: 'professional', label: 'Professional' },
          { value: 'funny', label: 'Funny' },
          { value: 'educational', label: 'Educational' },
          { value: 'sales_pitch', label: 'Sales pitch' },
        ],
      },
    }),
    verbosity: Property.StaticDropdown({
      displayName: 'Verbosity',
      description: 'How verbose the text should be.',
      required: false,
      defaultValue: 'standard',
      options: {
        options: [
          { value: 'concise', label: 'Concise' },
          { value: 'standard', label: 'Standard' },
          { value: 'text-heavy', label: 'Text-heavy' },
        ],
      },
    }),
    include_title_slide: Property.Checkbox({
      displayName: 'Include title slide',
      description: 'Whether to include a title slide.',
      required: false,
      defaultValue: true,
    }),
    allow_access_to_user_info: Property.Checkbox({
      displayName: "Allow access to user's info",
      description: "Whether to allow access to user's info.",
      required: false,
      defaultValue: true,
    }),
    files: Property.Array({
      displayName: 'Files',
      description:
        'Array of file identifiers, from the "Upload Source Files" action (optional).',
      required: false,
      defaultValue: [],
    }),
  },
  async run({ auth, propsValue }) {
    const {
      content,
      instructions,
      n_slides,
      language,
      design,
      tone,
      verbosity,
      include_title_slide,
      allow_access_to_user_info,
      files,
    } = propsValue;

    const body: Record<string, unknown> = {
      n_slides: Number(n_slides ?? 8),
      language: language ?? 'English',
      include_title_slide: include_title_slide ?? true,
      allow_access_to_user_info: allow_access_to_user_info ?? true,
    };
    if (content) body['content'] = content;
    if (instructions) body['instructions'] = instructions;
    if (design) body['design'] = design;
    if (tone) body['tone'] = tone;
    if (verbosity) body['verbosity'] = verbosity;
    if (files) body['files'] = files as unknown as string[];

    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/presentation/outlines/generate',
      body,
    });
  },
});
