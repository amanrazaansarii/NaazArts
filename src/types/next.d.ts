declare module 'next' {
  export interface NextConfig {
    [key: string]: any;
  }
  export interface Metadata {
    title?: string | { [key: string]: any };
    description?: string;
    keywords?: string[] | string;
    [key: string]: any;
  }
  export type Viewport = any;
}

declare module 'next/link' {
  import React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): any;
  export function usePathname(): string;
  export function useSearchParams(): any;
  export function redirect(url: string): void;
}

declare module 'next/image' {
  import React from 'react';
  const Image: React.ComponentType<any>;
  export default Image;
}

declare module 'next/server' {
  export class NextResponse {
    static json(body: any, init?: any): any;
  }
  export class NextRequest {}
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
