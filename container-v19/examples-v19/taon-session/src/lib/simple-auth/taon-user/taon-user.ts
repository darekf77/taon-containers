//#region imports
import { Taon } from 'taon/src';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { TaonSession } from '../taon-session';

import { TaonUserDefaultsValues } from './taon-user.defaults-values';
//#endregion

@Taon.Entity({
  className: 'TaonUser',
  createTable: true,
})
export class TaonUser extends Taon.Base.Entity<TaonUser> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => TaonSession, session => session.user, { cascade: true })
  sessions!: TaonSession[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
