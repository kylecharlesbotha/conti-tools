import { ConfigKeys } from '../../enums/ConfigKeys.enum';

declare global {
  interface Window {
    adminConfig: {
      [key: string]: string | number | boolean;
    };
  }
}

export const getConfig = <T extends string | number | boolean>(
  key: ConfigKeys
): T => {
  // eslint-disable-next-line security/detect-object-injection
  const value = window.adminConfig[key];

  if (value) {
    return value as T;
  } else {
    throw new Error(`Key: ${key} not in config`);
  }
};
