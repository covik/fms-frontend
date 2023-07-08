import { NoNativeSharingMechanism } from './exception';

type AvailableStrategies = 'webshare' | 'clipboard';

export async function shareUrl(
  url: string,
  title: string,
): Promise<AvailableStrategies> {
  if ('share' in navigator) {
    await navigator.share({
      url,
      title,
    });
    return 'webshare';
  } else {
    // For some reason TS says type of clipboard is never.
    // @ts-expect-error
    if ('clipboard' in navigator && 'writeText' in navigator.clipboard) {
      // @ts-expect-error
      await navigator.clipboard.writeText(url);
      return 'clipboard';
    }
  }

  throw new NoNativeSharingMechanism();
}
