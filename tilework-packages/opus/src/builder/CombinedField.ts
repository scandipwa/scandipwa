import { GraphQlRequestType } from '../client/prepare-document';
import { AbstractField } from './AbstractField';
import { Mutation } from './Mutation';
import { Query } from './Query';

export class CombinedField<ReturnType> {
    type?: GraphQlRequestType;

    resultTypeHolder?: ReturnType;

    protected fields: AbstractField<any, any, any>[] = [];

    add<Name extends string, FieldReturnType, IsArray extends boolean>(
        field: Query<Name, FieldReturnType, IsArray> | Mutation<Name, FieldReturnType, IsArray>
    ): CombinedField<ReturnType & {[k in Name]: IsArray extends true ? FieldReturnType[] : FieldReturnType}> {
        // Handle first field
        if (!this.type) {
            this.type = field.type;

        // Handle attempt to combine queries together with mutations
        } else if (this.type !== field.type) {
            throw new Error('Cannot combine queries and mutations together!');
        }

        this.fields.push(field);

        return this as any;
    }

    getFields = () => this.fields;
}
