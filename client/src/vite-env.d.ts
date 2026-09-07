/// <reference types="vite/client" />
import type { HTMLAttributes, DetailedHTMLProps } from "react";

declare global {
  interface ImportMetaEnv {
    /** Behold.so の Instagram ウィジェット feed-id */
    readonly PUBLIC_BEHOLD_FEED_ID?: string;
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      /** Behold.so 埋め込みウィジェット（Web Components カスタム要素） */
      "behold-widget": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "feed-id"?: string;
      };
    }
  }
}
