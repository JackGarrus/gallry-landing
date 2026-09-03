type Plausible = (
  eventName: string,
  options?: {
    props?: Record<string, string>;
  },
) => void;

export function track(eventName: string) {
  const plausible = (
    window as typeof window & {
      plausible?: Plausible;
    }
  ).plausible;

  plausible?.(eventName);
}
