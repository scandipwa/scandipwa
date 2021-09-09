import { lazy } from 'react';

/**
 * Allows to lazy import component with named export
 *
 * https://github.com/facebook/react/issues/14603#issuecomment-736878172
 * @param loader `() => import('path/to/component')`
 */
export const lazily = <U extends string, T extends Record<U, unknown>>(
    loader: (x?: string) => Promise<T>
): T => new Proxy({} as T, {
        get(_target, componentName: U): React.LazyExoticComponent<React.ComponentType> {
            return lazy(() => loader(componentName).then((x) => ({
                default: x[componentName] as React.ComponentType
            })));
        }
    });
