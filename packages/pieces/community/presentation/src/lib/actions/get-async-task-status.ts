import { createAction, Property } from '@activepieces/pieces-framework';
import { presentonAuth } from '../common/auth';
import { makeRequestV3 } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { presentationGetAsyncTaskStatusOutputSchema } from '../output-schemas';

export const getAsyncTaskStatus = createAction({
  auth: presentonAuth,
  name: 'presentation_get_async_task_status',
  outputSchema: presentationGetAsyncTaskStatusOutputSchema,
  classification: 'READ',
  displayName: 'Get Async Task Status',
  description: 'Get the status of a Presenton Cloud v3 async task by its id.',
  audience: 'ai',
  aiMetadata: {
    description:
      'Reads the current status, message and (once finished) the result of a Presenton Cloud v3 async task, such as one started by "Generate Presentation (v3, async)". Use to poll a task without blocking. Idempotent: re-reading the same id has no side effects.',
    idempotent: true,
  },
  props: {
    task_id: Property.ShortText({
      displayName: 'Task id',
      description:
        'The task id returned by an async action such as "Generate Presentation (v3, async)".',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    return makeRequestV3({
      apiKey: auth.secret_text,
      method: HttpMethod.GET,
      path: `/async-task/status/${propsValue.task_id}`,
    });
  },
});
