import { OutputSchema } from '@activepieces/pieces-framework';

export const presentationGeneratePresentationAsyncOutputSchema: OutputSchema = {
  fields: [
    { key: 'user', label: 'User' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'message', label: 'Message' },
    { key: 'id', label: 'ID' },
    { key: 'data', label: 'Data' },
    { key: 'error', label: 'Error' },
    { key: 'created_at', label: 'Created At', format: 'datetime' },
    { key: 'updated_at', label: 'Updated At', format: 'datetime' },
  ],
};

export const presentationListPresentationsOutputSchema: OutputSchema = {
  fields: [
    { key: 'total_pages', label: 'Total Pages', format: 'number' },
    { key: 'page', label: 'Page', format: 'number' },
    { key: 'page_size', label: 'Page Size', format: 'number' },
    { key: 'results', label: 'Results' },
  ],
};

export const presentationListSmartDesignsOutputSchema: OutputSchema = {
  fields: [
    { key: 'total_pages', label: 'Total Pages', format: 'number' },
    { key: 'page', label: 'Page', format: 'number' },
    { key: 'page_size', label: 'Page Size', format: 'number' },
    {
      key: 'results',
      label: 'Results',
      labelKey: 'name',
      listItems: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'thumbnail_url', label: 'Thumbnail URL', format: 'image' },
        { key: 'created_at', label: 'Created At', format: 'datetime' },
      ],
    },
  ],
};

export const presentationListStandardTemplatesOutputSchema: OutputSchema = {
  fields: [
    {
      key: 'items',
      label: 'Items',
      labelKey: 'name',
      listItems: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'layout_count', label: 'Layout Count', format: 'number' },
        { key: 'thumbnail', label: 'Thumbnail', format: 'image' },
        { key: 'is_default', label: 'Is Default', format: 'boolean' },
        { key: 'created_at', label: 'Created At', format: 'datetime' },
        { key: 'updated_at', label: 'Updated At', format: 'datetime' },
      ],
    },
    { key: 'total', label: 'Total', format: 'number' },
    { key: 'page', label: 'Page', format: 'number' },
    { key: 'page_size', label: 'Page Size', format: 'number' },
  ],
};

export const presentationGetAsyncTaskStatusOutputSchema: OutputSchema = {
  fields: [
    { key: 'message', label: 'Message' },
    { key: 'user', label: 'User' },
    { key: 'type', label: 'Type' },
    { key: 'error', label: 'Error' },
    { key: 'updated_at', label: 'Updated At', format: 'datetime' },
    { key: 'status', label: 'Status' },
    { key: 'id', label: 'ID' },
    { key: 'data', label: 'Data' },
    { key: 'created_at', label: 'Created At', format: 'datetime' },
  ],
};

export const presentationUploadSourceFilesOutputSchema: OutputSchema = {
  itemLabel: 'File {$index}',
  fields: [
    { key: 'files', label: 'Files', value: '' },
  ],
};
