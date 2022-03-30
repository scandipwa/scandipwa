import type { AbstractField, Field } from './AbstractField';
import type { InlineFragment } from './InlineFragment';
import type { Mutation } from './Mutation';
import type { Query } from './Query';

export interface FieldDescendantStore<
    N extends string,
    RT,
    A extends boolean
> {
    Query: Query<N, RT, A>,
    Mutation: Mutation<N, RT, A>,
    Field: Field<N, RT, A>,
    AbstractField: AbstractField<N, RT, A>,
    InlineFragment: InlineFragment<N, RT>
}

export type HigherKindType<
    $ extends keyof FieldDescendantStore<any, any, any>,
    N extends string,
    RT,
    A extends boolean = false
> = FieldDescendantStore<N, RT, A>[$]
