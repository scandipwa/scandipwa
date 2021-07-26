/* eslint-disable */
import React from 'react';

export function getContainerProps<
    T extends React.ComponentClass | string[],
    K extends Record<string, unknown>[]
>(componentOrIncludedPropsArray: T, ...props: K): { [G in keyof K]: K[G] }
