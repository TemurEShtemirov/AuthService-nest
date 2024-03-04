import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  fullName: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ type: 'VIRTUAL' })
  ctx: any;
}
