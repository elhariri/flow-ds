import {
  PrismaDelegate,
  PrismaReadOptions,
  PrismaUpdateOptions,
  Repository,
} from "../../repository.types";

class PrismaRepositoryWrapper<
  TValues,
  TReadOptions extends PrismaReadOptions<TValues> = PrismaReadOptions<TValues>,
  TUpdateOptions extends PrismaUpdateOptions<TValues> = PrismaUpdateOptions<TValues>
> implements Repository<TValues, TReadOptions, TUpdateOptions>
{
  private prismaDelegate: PrismaDelegate<TValues>;

  constructor(repositoryGateway: any) {
    this.prismaDelegate = repositoryGateway;
  }

  public async create(values: TValues): Promise<any> {
    return this.prismaDelegate.create({ data: values });
  }

  public async update(values: Partial<TValues>, options: any): Promise<any> {
    return this.prismaDelegate.update({ data: values, ...options });
  }

  public async deleteById(id: string): Promise<any> {
    const options = {
      where: { id: parseInt(id, 10) },
    } as {
      where: Pick<TValues & { id: number }, "id"> &
        Partial<TValues & { id: number }>;
    };

    return this.prismaDelegate.delete(options);
  }

  public async findAll(options?: TReadOptions): Promise<TValues[]> {
    return this.prismaDelegate.findMany(options);
  }

  public async findById(id: string | number): Promise<TValues> {
    const options = {
      where: { id: typeof id === "number" ? id : parseInt(id, 10) },
    } as {
      where: Pick<TValues & { id: number }, "id"> &
        Partial<TValues & { id: number }>;
    };

    return this.prismaDelegate.findUnique(options);
  }

  public async findOne(options: TReadOptions): Promise<TValues> {
    return this.prismaDelegate.findUnique(options);
  }

  public async find(options: TReadOptions): Promise<TValues[]> {
    return this.prismaDelegate.findMany(options);
  }
}

export default PrismaRepositoryWrapper;
