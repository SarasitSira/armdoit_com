declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      "auto-rotate"?: boolean;
      "camera-controls"?: boolean;
      "shadow-intensity"?: string;
      "environment-image"?: string;
      exposure?: string;
    };
  }
}
