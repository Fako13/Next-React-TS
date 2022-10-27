/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;

  export default content;
}