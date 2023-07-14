import { Sequelize } from "sequelize-typescript";
import { Transaction } from "sequelize/types";
import { TransactionInterface } from "../domain/@shared/domain/transaction.interface";

export class TransactionSequelize implements TransactionInterface {
  private queryRunner: Transaction;

  constructor(
    private context: { get: (name: string) => Promise<any> },
    private sequelize: Sequelize
  ) {}

  async start(): Promise<void> {
    if (!this.queryRunner) {
      this.queryRunner = await this.sequelize.transaction();
    }
  }

  async commit(): Promise<void> {
    this.validateTransaction();
    await this.queryRunner.commit();
    this.queryRunner = null;
  }

  async rollback(): Promise<void> {
    this.validateTransaction();
    await this.queryRunner.rollback();
    this.queryRunner = null;
  }

  async do<T>(workFn: (transaction: TransactionInterface) => Promise<T>): Promise<T> {
    try {
      if (this.queryRunner) {
        const result = await workFn(this);
        this.queryRunner = null;
        return result;
      }

      const result = await this.sequelize.transaction(async (t) => {
        this.queryRunner = t;
        return await workFn(this);
      });
      this.queryRunner = null;
      return result;
    } catch (e) {
      this.queryRunner = null;
      throw e;
    }
  }

  async getRepository(repoName: any): Promise<any> {
    this.validateTransaction();

    const repo = await this.context.get(repoName);
    if (!repo) {
      throw new Error(`Repository ${repoName} not found`);
    }
    repo.setUnitOfWork(this);
    return repo;
  }

  getTransaction() {
    return this.queryRunner;
  }

  private validateTransaction() {
    if (!this.queryRunner) {
      throw new Error("No transaction started");
    }
  }
}