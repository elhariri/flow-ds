import { Prisma } from "@prisma/client";

type PutResponse<TValues> =
  | {
      success: false;
    }
  | {
      success: true;
      values: TValues;
    };

type DeleteResponse = {
  success: boolean;
};

export interface Repository<TValues, TReadOptions = any, TUpdateOptions = any> {
  create(values: TValues): Promise<PutResponse<TValues>>;

  update(
    values: TValues,
    options: TUpdateOptions
  ): Promise<PutResponse<TValues>>;

  deleteById(id: string): Promise<DeleteResponse>;

  find(options: TReadOptions): Promise<TValues[]>;

  findOne(options: TReadOptions): Promise<TValues>;

  findAll(): Promise<TValues[]>;

  findById(id: string): Promise<TValues>;
}

// TO-DO

export type SchemaType<TValues, TRefrences extends {} = {}> = TValues & {
  id: number;
} & TRefrences;

export type PartialValuesWithId<TValues, TRefrences extends {} = {}> = Partial<
  SchemaType<TValues, TRefrences>
>;

type SelectedKeys<TValues, TRefrences extends {} = {}> = {
  [K in keyof PartialValuesWithId<TValues, TRefrences>]?: boolean;
};

export type PrismaReadOptions<TValues> = {
  select?: SelectedKeys<TValues>;
  include?: SelectedKeys<TValues>;
  where?: PartialValuesWithId<TValues>;
  orderBy?: Prisma.Enumerable<any>;
  cursor?: TValues;
  take?: number;
  skip?: number;
  distinct?: Prisma.Enumerable<any>;
};

export type PrismaUpdateOptions<TValues> = {
  select?: SelectedKeys<TValues>;
  include?: SelectedKeys<TValues>;
  data: any;
  where: SchemaType<TValues>;
};

export type PrismaDelegate<TValues> = {
  findMany: (arg?: PrismaReadOptions<TValues> | null) => TValues[];

  create: (arg: {
    select?: SelectedKeys<TValues>;
    include?: SelectedKeys<TValues>;
    data: any;
  }) => any;

  update: (arg: PrismaUpdateOptions<TValues>) => any;

  delete: (arg: {
    select?: SelectedKeys<TValues>;
    include?: SelectedKeys<TValues>;
    where: PartialValuesWithId<TValues>;
  }) => any;

  findUnique: (arg: PrismaReadOptions<TValues> | null) => TValues;
};
