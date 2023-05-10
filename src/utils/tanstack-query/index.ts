export const preventAutomaticRetry = {
  retry: false,
};

export const preventAutomaticRefetch = {
  refetchInterval: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
} satisfies Record<string, false>;
/**
 * 'satisfies' is required since TS infers value types as 'boolean' while React Query's
 * useQuery() method expects 'false'
 */
