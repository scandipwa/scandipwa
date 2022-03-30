export const deepApply = (fn: (obj: any) => any, obj: any): void => {
    if (typeof obj !== 'object') {
        return;
    }

    fn(obj);

    for (const key in obj) {
        deepApply(fn, obj[key]);
    }
};
