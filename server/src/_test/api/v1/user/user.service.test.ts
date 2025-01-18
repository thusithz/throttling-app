import { testUtils } from '../../../utils/test.utils';
import { UserService } from '../../../../../src/api/v1/user/user.service';
import { IUser } from '../../../../api/v1/user/interfaces/IUser';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    await testUtils.setupDB();
    userService = new UserService();
  });

  afterAll(async () => {
    await testUtils.closeDB();
  });

  beforeEach(async () => {
    await testUtils.clearDB();
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };

    const user = await userService.create(userData);
    expect(user.email).toBe(userData.email);
    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
  });

  it('should not create user with duplicate email', async () => {
    const userData = {
      email: 'test@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };

    await userService.create(userData);
    await expect(userService.create(userData)).rejects.toThrow(
      'Email "test@test.com" is already taken',
    );
  });

  it('should login user with correct credentials', async () => {
    const userData = {
      email: 'test@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };

    await userService.create(userData);
    const loginResult = await userService.login({
      email: userData.email,
      password: userData.password,
    });

    expect(loginResult).toBeTruthy();
    expect(loginResult?.token).toBeDefined();
  });
});
function expect(
  loginResult: {
    token: string;
    email: string;
    password: string;
    hash?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    _id: FlattenMaps<unknown>;
    $assertPopulated: <Paths = {}>(
      path: string | string[],
      values?: Partial<Paths> | undefined,
    ) => Omit<IUser & Required<{ _id: unknown }>, keyof Paths> & Paths;
    $clearModifiedPaths: () => IUser & Required<{ _id: unknown }>;
    $clone: () => IUser & Required<{ _id: unknown }>;
    $createModifiedPathsSnapshot: () => ModifiedPathsSnapshot;
    $getAllSubdocs: () => Document[];
    $ignore: (path: string) => void;
    $isDefault: (path: string) => boolean;
    $isDeleted: (val?: boolean) => boolean;
    $getPopulatedDocs: () => Document[];
    $inc: (
      path: string | string[],
      val?: number,
    ) => IUser & Required<{ _id: unknown }>;
    $isEmpty: (path: string) => boolean;
    $isValid: (path: string) => boolean;
    $locals: FlattenMaps<Record<string, unknown>>;
    $markValid: (path: string) => void;
    $model: {
      <
        ModelType = Model<
          unknown,
          {},
          {},
          {},
          Document<unknown, {}, unknown> & { _id: Types.ObjectId } & {
            __v: number;
          },
          any
        >,
      >(
        name: string,
      ): ModelType;
      <ModelType = Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    $op: 'save' | 'validate' | 'remove' | null;
    $restoreModifiedPathsSnapshot: (
      snapshot: ModifiedPathsSnapshot,
    ) => IUser & Required<{ _id: unknown }>;
    $session: (session?: ClientSession | null) => ClientSession | null;
    $set: {
      (
        path: string | Record<string, any>,
        val: any,
        type: any,
        options?: DocumentSetOptions,
      ): IUser & Required<{ _id: unknown }>;
      (
        path: string | Record<string, any>,
        val: any,
        options?: DocumentSetOptions,
      ): IUser & Required<{ _id: unknown }>;
      (value: string | Record<string, any>): IUser & Required<{ _id: unknown }>;
    };
    $where: FlattenMaps<Record<string, unknown>>;
    baseModelName?: string | undefined;
    collection: Collection;
    db: FlattenMaps<Connection>;
    deleteOne: (options?: QueryOptions) => any;
    depopulate: <Paths = {}>(
      path?: string | string[],
    ) => MergeType<IUser & Required<{ _id: unknown }>, Paths>;
    directModifiedPaths: () => Array<string>;
    equals: (doc: Document<unknown, any, any>) => boolean;
    errors?: Error.ValidationError | undefined;
    get: {
      <T extends string | number | symbol>(
        path: T,
        type?: any,
        options?: any,
      ): any;
      (path: string, type?: any, options?: any): any;
    };
    getChanges: () => UpdateQuery<IUser & Required<{ _id: unknown }>>;
    id?: any;
    increment: () => IUser & Required<{ _id: unknown }>;
    init: (
      obj: AnyObject,
      opts?: AnyObject,
    ) => IUser & Required<{ _id: unknown }>;
    invalidate: {
      <T extends string | number | symbol>(
        path: T,
        errorMsg: string | NativeError,
        value?: any,
        kind?: string,
      ): NativeError | null;
      (
        path: string,
        errorMsg: string | NativeError,
        value?: any,
        kind?: string,
      ): NativeError | null;
    };
    isDirectModified: {
      <T extends string | number | symbol>(path: T | T[]): boolean;
      (path: string | Array<string>): boolean;
    };
    isDirectSelected: {
      <T extends string | number | symbol>(path: T): boolean;
      (path: string): boolean;
    };
    isInit: {
      <T extends string | number | symbol>(path: T): boolean;
      (path: string): boolean;
    };
    isModified: {
      <T extends string | number | symbol>(
        path?: T | T[] | undefined,
        options?: { ignoreAtomics?: boolean } | null,
      ): boolean;
      (
        path?: string | Array<string>,
        options?: { ignoreAtomics?: boolean } | null,
      ): boolean;
    };
    isNew: boolean;
    isSelected: {
      <T extends string | number | symbol>(path: T): boolean;
      (path: string): boolean;
    };
    markModified: {
      <T extends string | number | symbol>(path: T, scope?: any): void;
      (path: string, scope?: any): void;
    };
    model: {
      <
        ModelType = Model<
          unknown,
          {},
          {},
          {},
          Document<unknown, {}, unknown> & { _id: Types.ObjectId } & {
            __v: number;
          },
          any
        >,
      >(
        name: string,
      ): ModelType;
      <ModelType = Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    modifiedPaths: (options?: { includeChildren?: boolean }) => Array<string>;
    overwrite: (obj: AnyObject) => IUser & Required<{ _id: unknown }>;
    $parent: () => Document | undefined;
    populate: {
      <Paths = {}>(
        path: string | PopulateOptions | (string | PopulateOptions)[],
      ): Promise<MergeType<IUser & Required<{ _id: unknown }>, Paths>>;
      <Paths = {}>(
        path: string,
        select?: string | AnyObject,
        model?: Model<any>,
        match?: AnyObject,
        options?: PopulateOptions,
      ): Promise<MergeType<IUser & Required<{ _id: unknown }>, Paths>>;
    };
    populated: (path: string) => any;
    replaceOne: (
      replacement?: AnyObject,
      options?: QueryOptions | null,
    ) => Query<
      any,
      IUser & Required<{ _id: unknown }>,
      {},
      unknown,
      'find',
      Record<string, never>
    >;
    save: (
      options?: SaveOptions,
    ) => Promise<IUser & Required<{ _id: unknown }>>;
    schema: FlattenMaps<
      Schema<
        any,
        Model<any, any, any, any, any, any>,
        {},
        {},
        {},
        {},
        DefaultSchemaOptions,
        { [x: string]: unknown },
        Document<unknown, {}, FlatRecord<{ [x: string]: unknown }>> &
          FlatRecord<{ [x: string]: unknown }> &
          Required<{ _id: unknown }> & { __v: number }
      >
    >;
    set: {
      <T extends string | number | symbol>(
        path: T,
        val: any,
        type: any,
        options?: DocumentSetOptions,
      ): IUser & Required<{ _id: unknown }>;
      (
        path: string | Record<string, any>,
        val: any,
        type: any,
        options?: DocumentSetOptions,
      ): IUser & Required<{ _id: unknown }>;
      (
        path: string | Record<string, any>,
        val: any,
        options?: DocumentSetOptions,
      ): IUser & Required<{ _id: unknown }>;
      (value: string | Record<string, any>): IUser & Required<{ _id: unknown }>;
    };
    toJSON: {
      (
        options?: ToObjectOptions & {
          flattenMaps?: true;
          flattenObjectIds?: false;
        },
      ): FlattenMaps<any>;
      (
        options: ToObjectOptions & { flattenObjectIds: false },
      ): FlattenMaps<any>;
      (options: ToObjectOptions & { flattenObjectIds: true }): {
        [x: string]: any;
      };
      (options: ToObjectOptions & { flattenMaps: false }): any;
      (
        options: ToObjectOptions & {
          flattenMaps: false;
          flattenObjectIds: true;
        },
      ): any;
      <T = any>(
        options?: ToObjectOptions & {
          flattenMaps?: true;
          flattenObjectIds?: false;
        },
      ): FlattenMaps<T>;
      <T = any>(
        options: ToObjectOptions & { flattenObjectIds: false },
      ): FlattenMaps<T>;
      <T = any>(
        options: ToObjectOptions & { flattenObjectIds: true },
      ): ObjectIdToString<FlattenMaps<T>>;
      <T = any>(options: ToObjectOptions & { flattenMaps: false }): T;
      <T = any>(
        options: ToObjectOptions & {
          flattenMaps: false;
          flattenObjectIds: true;
        },
      ): ObjectIdToString<T>;
    };
    toObject: {
      (options?: ToObjectOptions): any;
      <T>(options?: ToObjectOptions): Require_id<T>;
    };
    unmarkModified: {
      <T extends string | number | symbol>(path: T): void;
      (path: string): void;
    };
    updateOne: (
      update?:
        | UpdateWithAggregationPipeline
        | UpdateQuery<IUser & Required<{ _id: unknown }>>
        | undefined,
      options?: QueryOptions | null,
    ) => Query<
      any,
      IUser & Required<{ _id: unknown }>,
      {},
      unknown,
      'find',
      Record<string, never>
    >;
    validate: {
      <T extends string | number | symbol>(
        pathsToValidate?: T | T[] | undefined,
        options?: AnyObject,
      ): Promise<void>;
      (pathsToValidate?: pathsToValidate, options?: AnyObject): Promise<void>;
      (options: { pathsToSkip?: pathsToSkip }): Promise<void>;
    };
    validateSync: {
      (options: {
        pathsToSkip?: pathsToSkip;
        [k: string]: any;
      }): Error.ValidationError | null;
      <T extends string | number | symbol>(
        pathsToValidate?: T | T[] | undefined,
        options?: AnyObject,
      ): Error.ValidationError | null;
      (
        pathsToValidate?: pathsToValidate,
        options?: AnyObject,
      ): Error.ValidationError | null;
    };
  } | null,
) {
  throw new Error('Function not implemented.');
}

function beforeAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function afterAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
