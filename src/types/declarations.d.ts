declare module 'next/headers' {
  export function cookies(): Promise<{
    get(name: string): { name: string; value: string } | undefined;
    set(name: string, value: string, options?: any): void;
    delete(name: string): void;
  }>;
  export function headers(): Promise<Headers>;
}
