export * from './Breadcrumbs.js';

export interface Breadcrumb {
    url: string
    name: string
}

export type Breadcrumbs = Breadcrumb[];
