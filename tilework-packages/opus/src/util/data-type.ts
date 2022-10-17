import { AbstractField } from '../builder/AbstractField';
import { CombinedField } from '../builder/CombinedField';
import { DeepReadonly } from './deep-readonly';

export type DataType<
    T extends AbstractField<any, any, any> | CombinedField<any>
> = T extends AbstractField<infer N, infer RT, infer A>
    ? DeepReadonly<{[k in N]: A extends true ? RT[] : RT}>
    : T extends CombinedField<infer RT>
    ? DeepReadonly<RT>
    : never;
