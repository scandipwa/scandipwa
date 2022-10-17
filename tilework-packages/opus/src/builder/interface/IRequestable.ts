import { GraphQlRequestType } from '../../client/prepare-document';

export interface IRequestable {
    readonly type: GraphQlRequestType
}
