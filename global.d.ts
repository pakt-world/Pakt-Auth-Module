declare module "*.gif" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare module "*.jpeg" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

// React 19 JSX types
declare namespace JSX {
    interface Element extends React.JSX.Element {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
}
