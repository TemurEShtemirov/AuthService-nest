import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ unique: true })
  email: string;

  @Column
  fullName: string;

  @Column
  password: string;
}
