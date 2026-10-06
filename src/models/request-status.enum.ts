export const RequestStatus = {
  Initial: 'initial',
  Loading: 'loading',
  Success: 'success',
  Empty: 'empty',
  Error: 'error',
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];