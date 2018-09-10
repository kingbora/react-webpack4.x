/**
 * 声明scss模块
 */
declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}