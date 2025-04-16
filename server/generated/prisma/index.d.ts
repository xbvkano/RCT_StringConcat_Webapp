
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Marcos_Data
 * 
 */
export type Marcos_Data = $Result.DefaultSelection<Prisma.$Marcos_DataPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProgrammingLanguage: {
  cpp: 'cpp',
  java: 'java',
  csharp: 'csharp',
  js: 'js',
  ts: 'ts',
  python: 'python',
  other: 'other'
};

export type ProgrammingLanguage = (typeof ProgrammingLanguage)[keyof typeof ProgrammingLanguage]


export const Sex: {
  male: 'male',
  female: 'female',
  other: 'other'
};

export type Sex = (typeof Sex)[keyof typeof Sex]

}

export type ProgrammingLanguage = $Enums.ProgrammingLanguage

export const ProgrammingLanguage: typeof $Enums.ProgrammingLanguage

export type Sex = $Enums.Sex

export const Sex: typeof $Enums.Sex

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Marcos_Data
 * const marcos_Data = await prisma.marcos_Data.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Marcos_Data
   * const marcos_Data = await prisma.marcos_Data.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.marcos_Data`: Exposes CRUD operations for the **Marcos_Data** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Marcos_Data
    * const marcos_Data = await prisma.marcos_Data.findMany()
    * ```
    */
  get marcos_Data(): Prisma.Marcos_DataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Marcos_Data: 'Marcos_Data'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "marcos_Data"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Marcos_Data: {
        payload: Prisma.$Marcos_DataPayload<ExtArgs>
        fields: Prisma.Marcos_DataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Marcos_DataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Marcos_DataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          findFirst: {
            args: Prisma.Marcos_DataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Marcos_DataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          findMany: {
            args: Prisma.Marcos_DataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>[]
          }
          create: {
            args: Prisma.Marcos_DataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          createMany: {
            args: Prisma.Marcos_DataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Marcos_DataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>[]
          }
          delete: {
            args: Prisma.Marcos_DataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          update: {
            args: Prisma.Marcos_DataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          deleteMany: {
            args: Prisma.Marcos_DataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Marcos_DataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Marcos_DataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>[]
          }
          upsert: {
            args: Prisma.Marcos_DataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Marcos_DataPayload>
          }
          aggregate: {
            args: Prisma.Marcos_DataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarcos_Data>
          }
          groupBy: {
            args: Prisma.Marcos_DataGroupByArgs<ExtArgs>
            result: $Utils.Optional<Marcos_DataGroupByOutputType>[]
          }
          count: {
            args: Prisma.Marcos_DataCountArgs<ExtArgs>
            result: $Utils.Optional<Marcos_DataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    marcos_Data?: Marcos_DataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Marcos_Data
   */

  export type AggregateMarcos_Data = {
    _count: Marcos_DataCountAggregateOutputType | null
    _avg: Marcos_DataAvgAggregateOutputType | null
    _sum: Marcos_DataSumAggregateOutputType | null
    _min: Marcos_DataMinAggregateOutputType | null
    _max: Marcos_DataMaxAggregateOutputType | null
  }

  export type Marcos_DataAvgAggregateOutputType = {
    id: number | null
    yearsProgramming: number | null
    age: number | null
    accuracy: number | null
  }

  export type Marcos_DataSumAggregateOutputType = {
    id: number | null
    yearsProgramming: number | null
    age: number | null
    accuracy: number | null
  }

  export type Marcos_DataMinAggregateOutputType = {
    id: number | null
    yearsProgramming: number | null
    age: number | null
    sex: $Enums.Sex | null
    language: $Enums.ProgrammingLanguage | null
    email: string | null
    accuracy: number | null
    time: Date | null
    created_at: Date | null
  }

  export type Marcos_DataMaxAggregateOutputType = {
    id: number | null
    yearsProgramming: number | null
    age: number | null
    sex: $Enums.Sex | null
    language: $Enums.ProgrammingLanguage | null
    email: string | null
    accuracy: number | null
    time: Date | null
    created_at: Date | null
  }

  export type Marcos_DataCountAggregateOutputType = {
    id: number
    yearsProgramming: number
    age: number
    sex: number
    language: number
    email: number
    accuracy: number
    time: number
    created_at: number
    _all: number
  }


  export type Marcos_DataAvgAggregateInputType = {
    id?: true
    yearsProgramming?: true
    age?: true
    accuracy?: true
  }

  export type Marcos_DataSumAggregateInputType = {
    id?: true
    yearsProgramming?: true
    age?: true
    accuracy?: true
  }

  export type Marcos_DataMinAggregateInputType = {
    id?: true
    yearsProgramming?: true
    age?: true
    sex?: true
    language?: true
    email?: true
    accuracy?: true
    time?: true
    created_at?: true
  }

  export type Marcos_DataMaxAggregateInputType = {
    id?: true
    yearsProgramming?: true
    age?: true
    sex?: true
    language?: true
    email?: true
    accuracy?: true
    time?: true
    created_at?: true
  }

  export type Marcos_DataCountAggregateInputType = {
    id?: true
    yearsProgramming?: true
    age?: true
    sex?: true
    language?: true
    email?: true
    accuracy?: true
    time?: true
    created_at?: true
    _all?: true
  }

  export type Marcos_DataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marcos_Data to aggregate.
     */
    where?: Marcos_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcos_Data to fetch.
     */
    orderBy?: Marcos_DataOrderByWithRelationInput | Marcos_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Marcos_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcos_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcos_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Marcos_Data
    **/
    _count?: true | Marcos_DataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Marcos_DataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Marcos_DataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Marcos_DataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Marcos_DataMaxAggregateInputType
  }

  export type GetMarcos_DataAggregateType<T extends Marcos_DataAggregateArgs> = {
        [P in keyof T & keyof AggregateMarcos_Data]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarcos_Data[P]>
      : GetScalarType<T[P], AggregateMarcos_Data[P]>
  }




  export type Marcos_DataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Marcos_DataWhereInput
    orderBy?: Marcos_DataOrderByWithAggregationInput | Marcos_DataOrderByWithAggregationInput[]
    by: Marcos_DataScalarFieldEnum[] | Marcos_DataScalarFieldEnum
    having?: Marcos_DataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Marcos_DataCountAggregateInputType | true
    _avg?: Marcos_DataAvgAggregateInputType
    _sum?: Marcos_DataSumAggregateInputType
    _min?: Marcos_DataMinAggregateInputType
    _max?: Marcos_DataMaxAggregateInputType
  }

  export type Marcos_DataGroupByOutputType = {
    id: number
    yearsProgramming: number
    age: number
    sex: $Enums.Sex
    language: $Enums.ProgrammingLanguage
    email: string | null
    accuracy: number
    time: Date
    created_at: Date
    _count: Marcos_DataCountAggregateOutputType | null
    _avg: Marcos_DataAvgAggregateOutputType | null
    _sum: Marcos_DataSumAggregateOutputType | null
    _min: Marcos_DataMinAggregateOutputType | null
    _max: Marcos_DataMaxAggregateOutputType | null
  }

  type GetMarcos_DataGroupByPayload<T extends Marcos_DataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Marcos_DataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Marcos_DataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Marcos_DataGroupByOutputType[P]>
            : GetScalarType<T[P], Marcos_DataGroupByOutputType[P]>
        }
      >
    >


  export type Marcos_DataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    yearsProgramming?: boolean
    age?: boolean
    sex?: boolean
    language?: boolean
    email?: boolean
    accuracy?: boolean
    time?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["marcos_Data"]>

  export type Marcos_DataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    yearsProgramming?: boolean
    age?: boolean
    sex?: boolean
    language?: boolean
    email?: boolean
    accuracy?: boolean
    time?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["marcos_Data"]>

  export type Marcos_DataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    yearsProgramming?: boolean
    age?: boolean
    sex?: boolean
    language?: boolean
    email?: boolean
    accuracy?: boolean
    time?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["marcos_Data"]>

  export type Marcos_DataSelectScalar = {
    id?: boolean
    yearsProgramming?: boolean
    age?: boolean
    sex?: boolean
    language?: boolean
    email?: boolean
    accuracy?: boolean
    time?: boolean
    created_at?: boolean
  }

  export type Marcos_DataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "yearsProgramming" | "age" | "sex" | "language" | "email" | "accuracy" | "time" | "created_at", ExtArgs["result"]["marcos_Data"]>

  export type $Marcos_DataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Marcos_Data"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      yearsProgramming: number
      age: number
      sex: $Enums.Sex
      language: $Enums.ProgrammingLanguage
      email: string | null
      accuracy: number
      time: Date
      created_at: Date
    }, ExtArgs["result"]["marcos_Data"]>
    composites: {}
  }

  type Marcos_DataGetPayload<S extends boolean | null | undefined | Marcos_DataDefaultArgs> = $Result.GetResult<Prisma.$Marcos_DataPayload, S>

  type Marcos_DataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Marcos_DataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Marcos_DataCountAggregateInputType | true
    }

  export interface Marcos_DataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Marcos_Data'], meta: { name: 'Marcos_Data' } }
    /**
     * Find zero or one Marcos_Data that matches the filter.
     * @param {Marcos_DataFindUniqueArgs} args - Arguments to find a Marcos_Data
     * @example
     * // Get one Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Marcos_DataFindUniqueArgs>(args: SelectSubset<T, Marcos_DataFindUniqueArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Marcos_Data that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Marcos_DataFindUniqueOrThrowArgs} args - Arguments to find a Marcos_Data
     * @example
     * // Get one Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Marcos_DataFindUniqueOrThrowArgs>(args: SelectSubset<T, Marcos_DataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marcos_Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataFindFirstArgs} args - Arguments to find a Marcos_Data
     * @example
     * // Get one Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Marcos_DataFindFirstArgs>(args?: SelectSubset<T, Marcos_DataFindFirstArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marcos_Data that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataFindFirstOrThrowArgs} args - Arguments to find a Marcos_Data
     * @example
     * // Get one Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Marcos_DataFindFirstOrThrowArgs>(args?: SelectSubset<T, Marcos_DataFindFirstOrThrowArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Marcos_Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findMany()
     * 
     * // Get first 10 Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marcos_DataWithIdOnly = await prisma.marcos_Data.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Marcos_DataFindManyArgs>(args?: SelectSubset<T, Marcos_DataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Marcos_Data.
     * @param {Marcos_DataCreateArgs} args - Arguments to create a Marcos_Data.
     * @example
     * // Create one Marcos_Data
     * const Marcos_Data = await prisma.marcos_Data.create({
     *   data: {
     *     // ... data to create a Marcos_Data
     *   }
     * })
     * 
     */
    create<T extends Marcos_DataCreateArgs>(args: SelectSubset<T, Marcos_DataCreateArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Marcos_Data.
     * @param {Marcos_DataCreateManyArgs} args - Arguments to create many Marcos_Data.
     * @example
     * // Create many Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Marcos_DataCreateManyArgs>(args?: SelectSubset<T, Marcos_DataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Marcos_Data and returns the data saved in the database.
     * @param {Marcos_DataCreateManyAndReturnArgs} args - Arguments to create many Marcos_Data.
     * @example
     * // Create many Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Marcos_Data and only return the `id`
     * const marcos_DataWithIdOnly = await prisma.marcos_Data.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Marcos_DataCreateManyAndReturnArgs>(args?: SelectSubset<T, Marcos_DataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Marcos_Data.
     * @param {Marcos_DataDeleteArgs} args - Arguments to delete one Marcos_Data.
     * @example
     * // Delete one Marcos_Data
     * const Marcos_Data = await prisma.marcos_Data.delete({
     *   where: {
     *     // ... filter to delete one Marcos_Data
     *   }
     * })
     * 
     */
    delete<T extends Marcos_DataDeleteArgs>(args: SelectSubset<T, Marcos_DataDeleteArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Marcos_Data.
     * @param {Marcos_DataUpdateArgs} args - Arguments to update one Marcos_Data.
     * @example
     * // Update one Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Marcos_DataUpdateArgs>(args: SelectSubset<T, Marcos_DataUpdateArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Marcos_Data.
     * @param {Marcos_DataDeleteManyArgs} args - Arguments to filter Marcos_Data to delete.
     * @example
     * // Delete a few Marcos_Data
     * const { count } = await prisma.marcos_Data.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Marcos_DataDeleteManyArgs>(args?: SelectSubset<T, Marcos_DataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marcos_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Marcos_DataUpdateManyArgs>(args: SelectSubset<T, Marcos_DataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marcos_Data and returns the data updated in the database.
     * @param {Marcos_DataUpdateManyAndReturnArgs} args - Arguments to update many Marcos_Data.
     * @example
     * // Update many Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Marcos_Data and only return the `id`
     * const marcos_DataWithIdOnly = await prisma.marcos_Data.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Marcos_DataUpdateManyAndReturnArgs>(args: SelectSubset<T, Marcos_DataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Marcos_Data.
     * @param {Marcos_DataUpsertArgs} args - Arguments to update or create a Marcos_Data.
     * @example
     * // Update or create a Marcos_Data
     * const marcos_Data = await prisma.marcos_Data.upsert({
     *   create: {
     *     // ... data to create a Marcos_Data
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Marcos_Data we want to update
     *   }
     * })
     */
    upsert<T extends Marcos_DataUpsertArgs>(args: SelectSubset<T, Marcos_DataUpsertArgs<ExtArgs>>): Prisma__Marcos_DataClient<$Result.GetResult<Prisma.$Marcos_DataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Marcos_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataCountArgs} args - Arguments to filter Marcos_Data to count.
     * @example
     * // Count the number of Marcos_Data
     * const count = await prisma.marcos_Data.count({
     *   where: {
     *     // ... the filter for the Marcos_Data we want to count
     *   }
     * })
    **/
    count<T extends Marcos_DataCountArgs>(
      args?: Subset<T, Marcos_DataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Marcos_DataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Marcos_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Marcos_DataAggregateArgs>(args: Subset<T, Marcos_DataAggregateArgs>): Prisma.PrismaPromise<GetMarcos_DataAggregateType<T>>

    /**
     * Group by Marcos_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Marcos_DataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Marcos_DataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Marcos_DataGroupByArgs['orderBy'] }
        : { orderBy?: Marcos_DataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Marcos_DataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarcos_DataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Marcos_Data model
   */
  readonly fields: Marcos_DataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Marcos_Data.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Marcos_DataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Marcos_Data model
   */
  interface Marcos_DataFieldRefs {
    readonly id: FieldRef<"Marcos_Data", 'Int'>
    readonly yearsProgramming: FieldRef<"Marcos_Data", 'Int'>
    readonly age: FieldRef<"Marcos_Data", 'Int'>
    readonly sex: FieldRef<"Marcos_Data", 'Sex'>
    readonly language: FieldRef<"Marcos_Data", 'ProgrammingLanguage'>
    readonly email: FieldRef<"Marcos_Data", 'String'>
    readonly accuracy: FieldRef<"Marcos_Data", 'Float'>
    readonly time: FieldRef<"Marcos_Data", 'DateTime'>
    readonly created_at: FieldRef<"Marcos_Data", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Marcos_Data findUnique
   */
  export type Marcos_DataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter, which Marcos_Data to fetch.
     */
    where: Marcos_DataWhereUniqueInput
  }

  /**
   * Marcos_Data findUniqueOrThrow
   */
  export type Marcos_DataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter, which Marcos_Data to fetch.
     */
    where: Marcos_DataWhereUniqueInput
  }

  /**
   * Marcos_Data findFirst
   */
  export type Marcos_DataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter, which Marcos_Data to fetch.
     */
    where?: Marcos_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcos_Data to fetch.
     */
    orderBy?: Marcos_DataOrderByWithRelationInput | Marcos_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marcos_Data.
     */
    cursor?: Marcos_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcos_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcos_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marcos_Data.
     */
    distinct?: Marcos_DataScalarFieldEnum | Marcos_DataScalarFieldEnum[]
  }

  /**
   * Marcos_Data findFirstOrThrow
   */
  export type Marcos_DataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter, which Marcos_Data to fetch.
     */
    where?: Marcos_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcos_Data to fetch.
     */
    orderBy?: Marcos_DataOrderByWithRelationInput | Marcos_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marcos_Data.
     */
    cursor?: Marcos_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcos_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcos_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marcos_Data.
     */
    distinct?: Marcos_DataScalarFieldEnum | Marcos_DataScalarFieldEnum[]
  }

  /**
   * Marcos_Data findMany
   */
  export type Marcos_DataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter, which Marcos_Data to fetch.
     */
    where?: Marcos_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcos_Data to fetch.
     */
    orderBy?: Marcos_DataOrderByWithRelationInput | Marcos_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Marcos_Data.
     */
    cursor?: Marcos_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcos_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcos_Data.
     */
    skip?: number
    distinct?: Marcos_DataScalarFieldEnum | Marcos_DataScalarFieldEnum[]
  }

  /**
   * Marcos_Data create
   */
  export type Marcos_DataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * The data needed to create a Marcos_Data.
     */
    data: XOR<Marcos_DataCreateInput, Marcos_DataUncheckedCreateInput>
  }

  /**
   * Marcos_Data createMany
   */
  export type Marcos_DataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Marcos_Data.
     */
    data: Marcos_DataCreateManyInput | Marcos_DataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Marcos_Data createManyAndReturn
   */
  export type Marcos_DataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * The data used to create many Marcos_Data.
     */
    data: Marcos_DataCreateManyInput | Marcos_DataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Marcos_Data update
   */
  export type Marcos_DataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * The data needed to update a Marcos_Data.
     */
    data: XOR<Marcos_DataUpdateInput, Marcos_DataUncheckedUpdateInput>
    /**
     * Choose, which Marcos_Data to update.
     */
    where: Marcos_DataWhereUniqueInput
  }

  /**
   * Marcos_Data updateMany
   */
  export type Marcos_DataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Marcos_Data.
     */
    data: XOR<Marcos_DataUpdateManyMutationInput, Marcos_DataUncheckedUpdateManyInput>
    /**
     * Filter which Marcos_Data to update
     */
    where?: Marcos_DataWhereInput
    /**
     * Limit how many Marcos_Data to update.
     */
    limit?: number
  }

  /**
   * Marcos_Data updateManyAndReturn
   */
  export type Marcos_DataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * The data used to update Marcos_Data.
     */
    data: XOR<Marcos_DataUpdateManyMutationInput, Marcos_DataUncheckedUpdateManyInput>
    /**
     * Filter which Marcos_Data to update
     */
    where?: Marcos_DataWhereInput
    /**
     * Limit how many Marcos_Data to update.
     */
    limit?: number
  }

  /**
   * Marcos_Data upsert
   */
  export type Marcos_DataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * The filter to search for the Marcos_Data to update in case it exists.
     */
    where: Marcos_DataWhereUniqueInput
    /**
     * In case the Marcos_Data found by the `where` argument doesn't exist, create a new Marcos_Data with this data.
     */
    create: XOR<Marcos_DataCreateInput, Marcos_DataUncheckedCreateInput>
    /**
     * In case the Marcos_Data was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Marcos_DataUpdateInput, Marcos_DataUncheckedUpdateInput>
  }

  /**
   * Marcos_Data delete
   */
  export type Marcos_DataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
    /**
     * Filter which Marcos_Data to delete.
     */
    where: Marcos_DataWhereUniqueInput
  }

  /**
   * Marcos_Data deleteMany
   */
  export type Marcos_DataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marcos_Data to delete
     */
    where?: Marcos_DataWhereInput
    /**
     * Limit how many Marcos_Data to delete.
     */
    limit?: number
  }

  /**
   * Marcos_Data without action
   */
  export type Marcos_DataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marcos_Data
     */
    select?: Marcos_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marcos_Data
     */
    omit?: Marcos_DataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Marcos_DataScalarFieldEnum: {
    id: 'id',
    yearsProgramming: 'yearsProgramming',
    age: 'age',
    sex: 'sex',
    language: 'language',
    email: 'email',
    accuracy: 'accuracy',
    time: 'time',
    created_at: 'created_at'
  };

  export type Marcos_DataScalarFieldEnum = (typeof Marcos_DataScalarFieldEnum)[keyof typeof Marcos_DataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Sex'
   */
  export type EnumSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sex'>
    


  /**
   * Reference to a field of type 'Sex[]'
   */
  export type ListEnumSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sex[]'>
    


  /**
   * Reference to a field of type 'ProgrammingLanguage'
   */
  export type EnumProgrammingLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProgrammingLanguage'>
    


  /**
   * Reference to a field of type 'ProgrammingLanguage[]'
   */
  export type ListEnumProgrammingLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProgrammingLanguage[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type Marcos_DataWhereInput = {
    AND?: Marcos_DataWhereInput | Marcos_DataWhereInput[]
    OR?: Marcos_DataWhereInput[]
    NOT?: Marcos_DataWhereInput | Marcos_DataWhereInput[]
    id?: IntFilter<"Marcos_Data"> | number
    yearsProgramming?: IntFilter<"Marcos_Data"> | number
    age?: IntFilter<"Marcos_Data"> | number
    sex?: EnumSexFilter<"Marcos_Data"> | $Enums.Sex
    language?: EnumProgrammingLanguageFilter<"Marcos_Data"> | $Enums.ProgrammingLanguage
    email?: StringNullableFilter<"Marcos_Data"> | string | null
    accuracy?: FloatFilter<"Marcos_Data"> | number
    time?: DateTimeFilter<"Marcos_Data"> | Date | string
    created_at?: DateTimeFilter<"Marcos_Data"> | Date | string
  }

  export type Marcos_DataOrderByWithRelationInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    language?: SortOrder
    email?: SortOrderInput | SortOrder
    accuracy?: SortOrder
    time?: SortOrder
    created_at?: SortOrder
  }

  export type Marcos_DataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Marcos_DataWhereInput | Marcos_DataWhereInput[]
    OR?: Marcos_DataWhereInput[]
    NOT?: Marcos_DataWhereInput | Marcos_DataWhereInput[]
    yearsProgramming?: IntFilter<"Marcos_Data"> | number
    age?: IntFilter<"Marcos_Data"> | number
    sex?: EnumSexFilter<"Marcos_Data"> | $Enums.Sex
    language?: EnumProgrammingLanguageFilter<"Marcos_Data"> | $Enums.ProgrammingLanguage
    email?: StringNullableFilter<"Marcos_Data"> | string | null
    accuracy?: FloatFilter<"Marcos_Data"> | number
    time?: DateTimeFilter<"Marcos_Data"> | Date | string
    created_at?: DateTimeFilter<"Marcos_Data"> | Date | string
  }, "id">

  export type Marcos_DataOrderByWithAggregationInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    language?: SortOrder
    email?: SortOrderInput | SortOrder
    accuracy?: SortOrder
    time?: SortOrder
    created_at?: SortOrder
    _count?: Marcos_DataCountOrderByAggregateInput
    _avg?: Marcos_DataAvgOrderByAggregateInput
    _max?: Marcos_DataMaxOrderByAggregateInput
    _min?: Marcos_DataMinOrderByAggregateInput
    _sum?: Marcos_DataSumOrderByAggregateInput
  }

  export type Marcos_DataScalarWhereWithAggregatesInput = {
    AND?: Marcos_DataScalarWhereWithAggregatesInput | Marcos_DataScalarWhereWithAggregatesInput[]
    OR?: Marcos_DataScalarWhereWithAggregatesInput[]
    NOT?: Marcos_DataScalarWhereWithAggregatesInput | Marcos_DataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Marcos_Data"> | number
    yearsProgramming?: IntWithAggregatesFilter<"Marcos_Data"> | number
    age?: IntWithAggregatesFilter<"Marcos_Data"> | number
    sex?: EnumSexWithAggregatesFilter<"Marcos_Data"> | $Enums.Sex
    language?: EnumProgrammingLanguageWithAggregatesFilter<"Marcos_Data"> | $Enums.ProgrammingLanguage
    email?: StringNullableWithAggregatesFilter<"Marcos_Data"> | string | null
    accuracy?: FloatWithAggregatesFilter<"Marcos_Data"> | number
    time?: DateTimeWithAggregatesFilter<"Marcos_Data"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Marcos_Data"> | Date | string
  }

  export type Marcos_DataCreateInput = {
    yearsProgramming: number
    age: number
    sex: $Enums.Sex
    language: $Enums.ProgrammingLanguage
    email?: string | null
    accuracy: number
    time: Date | string
    created_at?: Date | string
  }

  export type Marcos_DataUncheckedCreateInput = {
    id?: number
    yearsProgramming: number
    age: number
    sex: $Enums.Sex
    language: $Enums.ProgrammingLanguage
    email?: string | null
    accuracy: number
    time: Date | string
    created_at?: Date | string
  }

  export type Marcos_DataUpdateInput = {
    yearsProgramming?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    language?: EnumProgrammingLanguageFieldUpdateOperationsInput | $Enums.ProgrammingLanguage
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: FloatFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Marcos_DataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    yearsProgramming?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    language?: EnumProgrammingLanguageFieldUpdateOperationsInput | $Enums.ProgrammingLanguage
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: FloatFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Marcos_DataCreateManyInput = {
    id?: number
    yearsProgramming: number
    age: number
    sex: $Enums.Sex
    language: $Enums.ProgrammingLanguage
    email?: string | null
    accuracy: number
    time: Date | string
    created_at?: Date | string
  }

  export type Marcos_DataUpdateManyMutationInput = {
    yearsProgramming?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    language?: EnumProgrammingLanguageFieldUpdateOperationsInput | $Enums.ProgrammingLanguage
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: FloatFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Marcos_DataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    yearsProgramming?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    language?: EnumProgrammingLanguageFieldUpdateOperationsInput | $Enums.ProgrammingLanguage
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: FloatFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumSexFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexFilter<$PrismaModel> | $Enums.Sex
  }

  export type EnumProgrammingLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgrammingLanguage | EnumProgrammingLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumProgrammingLanguageFilter<$PrismaModel> | $Enums.ProgrammingLanguage
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type Marcos_DataCountOrderByAggregateInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    language?: SortOrder
    email?: SortOrder
    accuracy?: SortOrder
    time?: SortOrder
    created_at?: SortOrder
  }

  export type Marcos_DataAvgOrderByAggregateInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    accuracy?: SortOrder
  }

  export type Marcos_DataMaxOrderByAggregateInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    language?: SortOrder
    email?: SortOrder
    accuracy?: SortOrder
    time?: SortOrder
    created_at?: SortOrder
  }

  export type Marcos_DataMinOrderByAggregateInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    language?: SortOrder
    email?: SortOrder
    accuracy?: SortOrder
    time?: SortOrder
    created_at?: SortOrder
  }

  export type Marcos_DataSumOrderByAggregateInput = {
    id?: SortOrder
    yearsProgramming?: SortOrder
    age?: SortOrder
    accuracy?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumSexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexWithAggregatesFilter<$PrismaModel> | $Enums.Sex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexFilter<$PrismaModel>
    _max?: NestedEnumSexFilter<$PrismaModel>
  }

  export type EnumProgrammingLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgrammingLanguage | EnumProgrammingLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumProgrammingLanguageWithAggregatesFilter<$PrismaModel> | $Enums.ProgrammingLanguage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProgrammingLanguageFilter<$PrismaModel>
    _max?: NestedEnumProgrammingLanguageFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSexFieldUpdateOperationsInput = {
    set?: $Enums.Sex
  }

  export type EnumProgrammingLanguageFieldUpdateOperationsInput = {
    set?: $Enums.ProgrammingLanguage
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumSexFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexFilter<$PrismaModel> | $Enums.Sex
  }

  export type NestedEnumProgrammingLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgrammingLanguage | EnumProgrammingLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumProgrammingLanguageFilter<$PrismaModel> | $Enums.ProgrammingLanguage
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumSexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexWithAggregatesFilter<$PrismaModel> | $Enums.Sex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexFilter<$PrismaModel>
    _max?: NestedEnumSexFilter<$PrismaModel>
  }

  export type NestedEnumProgrammingLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgrammingLanguage | EnumProgrammingLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProgrammingLanguage[] | ListEnumProgrammingLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumProgrammingLanguageWithAggregatesFilter<$PrismaModel> | $Enums.ProgrammingLanguage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProgrammingLanguageFilter<$PrismaModel>
    _max?: NestedEnumProgrammingLanguageFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}