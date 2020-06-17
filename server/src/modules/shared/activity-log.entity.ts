import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../modules/user/user.entity';

@Entity('activity_logs')
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userId: string

  @Column({
    name: 'ip_address',
    unique: false,
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  ipAddress: string;

  @Column({
    name: 'user_agent',
    unique: false,
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  userAgent: string;

  @Column({
    name: 'action_type',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  actionType: string;

  @Column({
    name: 'city',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  city: string;

  @Column({
    name: 'region',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  region: string;

  @Column({
    name: 'country',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  country: string;

  @Column({
    name: 'loc',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  loc: string;

  @Column({
    name: 'postal',
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  postal: string;

  @Column({
    name: 'date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: Date;
}
