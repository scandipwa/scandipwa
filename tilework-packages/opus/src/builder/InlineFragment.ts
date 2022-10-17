import { AbstractField } from './AbstractField';

export class InlineFragment<
    N extends string,
    RT
> extends AbstractField<N, RT, false> {
    readonly tag = 'InlineFragment';

    constructor(name: N) {
        super(`... on ${name}` as N);
    }
}
