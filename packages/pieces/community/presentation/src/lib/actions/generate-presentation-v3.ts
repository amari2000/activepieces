import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { presentationGeneratePresentationAsyncOutputSchema } from '../output-schemas';

export const generatePresentationV3 = createAction({
  auth: presentonAuth,
  name: 'presentation_generate_presentation_async',
  outputSchema: presentationGeneratePresentationAsyncOutputSchema,
  classification: 'WRITE',
  displayName: 'Generate Presentation (v3, async)',
  description:
    'Start an asynchronous presentation generation task on Presenton Cloud v3 and return its task id immediately, without waiting for completion.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Fires a Presenton Cloud v3 presentation generation job and returns the task id right away, without blocking. Use this instead of the blocking "Generate Presentations (async)" action when the deck may take longer than 120 seconds to generate, or when the agent wants to do other work while it renders; poll the returned id with "Get Async Task Status" until it completes. Not idempotent: each call starts a new generation task.',
    idempotent: false,
  },
  props: {
    content: Property.LongText({
      displayName: 'Content',
      description: 'The content for generating the presentation.',
      required: false,
    }),
    instructions: Property.LongText({
      displayName: 'Instructions',
      description: 'Instruction for generating the presentation (optional).',
      required: false,
    }),
    n_slides: Property.Number({
      displayName: 'Number of slides',
      description: 'Number of slides to generate.',
      required: false,
      defaultValue: 8,
    }),
    language: Property.ShortText({
      displayName: 'Language',
      description: 'Language for the presentation.',
      required: false,
      defaultValue: 'English',
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
    markdown_emphasis: Property.Checkbox({
      displayName: 'Markdown emphasis',
      description: 'Whether to emphasize the markdown.',
      required: false,
      defaultValue: true,
    }),
    web_search: Property.Checkbox({
      displayName: 'Enable web search',
      description: 'Whether to enable web search.',
      required: false,
      defaultValue: false,
    }),
    image_type: Property.StaticDropdown({
      displayName: 'Image type',
      description: 'Type of image to generate.',
      required: false,
      defaultValue: 'stock',
      options: {
        options: [
          { value: 'stock', label: 'Stock' },
          { value: 'ai-generated', label: 'AI generated' },
        ],
      },
    }),
    theme: Property.ShortText({
      displayName: 'Theme',
      description:
        'Theme to use for the presentation (e.g. edge-yellow, light-rose).',
      required: false,
    }),
    standard_template: Property.ShortText({
      displayName: 'Standard template id',
      description:
        'Standard template id to use, from the "List Standard Templates" action.',
      required: false,
    }),
    smart_design: Property.ShortText({
      displayName: 'Smart design id',
      description: 'Smart design id to use, from the "List Smart Designs" action.',
      required: false,
    }),
    include_table_of_contents: Property.Checkbox({
      displayName: 'Include table of contents',
      description: 'Whether to include a table of contents.',
      required: false,
      defaultValue: false,
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
    export_as: Property.StaticDropdown({
      displayName: 'Export as',
      description: 'Export format.',
      required: false,
      defaultValue: 'pptx',
      options: {
        options: [
          { value: 'pptx', label: 'PPTX' },
          { value: 'pdf', label: 'PDF' },
          { value: 'png', label: 'PNG' },
        ],
      },
    }),
    trigger_webhook: Property.Checkbox({
      displayName: 'Trigger webhook',
      description: 'Whether to trigger subscribed webhooks.',
      required: false,
      defaultValue: false,
    }),
  },
  async run({ auth, propsValue }) {
    const {
      content,
      instructions,
      n_slides,
      language,
      tone,
      verbosity,
      markdown_emphasis,
      web_search,
      image_type,
      theme,
      standard_template,
      smart_design,
      include_table_of_contents,
      include_title_slide,
      allow_access_to_user_info,
      files,
      export_as,
      trigger_webhook,
    } = propsValue;

    const body: Record<string, unknown> = {
      markdown_emphasis: markdown_emphasis ?? true,
      web_search: web_search ?? false,
      n_slides: Number(n_slides ?? 8),
      language: language ?? 'English',
      include_table_of_contents: include_table_of_contents ?? false,
      include_title_slide: include_title_slide ?? true,
      allow_access_to_user_info: allow_access_to_user_info ?? true,
      export_as: export_as ?? 'pptx',
      trigger_webhook: trigger_webhook ?? false,
    };
    if (content) body['content'] = content;
    if (instructions) body['instructions'] = instructions;
    if (tone) body['tone'] = tone;
    if (verbosity) body['verbosity'] = verbosity;
    if (image_type) body['image_type'] = image_type;
    if (theme) body['theme'] = theme;
    if (standard_template) body['standard_template'] = standard_template;
    if (smart_design) body['smart_design'] = smart_design;
    if (files) body['files'] = files as unknown as string[];

    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/presentation/generate/async',
      body,
    });
  },
});
