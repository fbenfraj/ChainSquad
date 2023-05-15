import {
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

export default class BaseModel extends Model {
  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date | undefined;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt: Date | undefined;
}
