export type UploadException = {
  message: string;
  errors: Record<string, string[]>;
};
