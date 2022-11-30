// import x from "image.png"を可能にする型定義

declare module "*.jpg" {
    const value: any;
    export default value;
}

declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.svg" {
    const value: any;
    export default value;
}
