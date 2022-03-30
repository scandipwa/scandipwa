import { GraphQlRequestType } from '../client/prepare-document';
import { AbstractField } from './AbstractField';
import { IRequestable } from './interface/IRequestable';

export class Mutation<
    Name extends string,
    FieldReturnType,
    IsArray extends boolean = false
> extends AbstractField<Name, FieldReturnType, IsArray> implements IRequestable {
    readonly tag = 'Mutation';

    readonly type = GraphQlRequestType.Mutation;
}
