//#region imports
import { Taon } from 'taon/src';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { TaonUser } from '../taon-user';

import { TaonSessionDefaultsValues } from './taon-session.defaults-values';
//#endregion

@Taon.Entity({
  className: 'TaonSession',
  createTable: true,
})
export class TaonSession extends Taon.Base.Entity<TaonSession> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => TaonUser, user => user.sessions, { onDelete: 'CASCADE' })
  user!: TaonUser;

  @Column()
  @Index()
  token!: string; // e.g. random string or JWT id (jti)

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
