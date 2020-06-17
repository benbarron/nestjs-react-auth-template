import * as bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'profile_image',
    unique: false,
    length: 100,
    nullable: true,
  })
  profileImage: string;

  @Column({
    name: 'city',
    unique: false,
    nullable: true,
    length: 255,
  })
  city: string;

  @Column({
    name: 'state',
    unique: false,
    nullable: true,
    length: 255,
  })
  state: string;

  @Column({
    name: 'bio',
    unique: false,
    nullable: true,
    length: 255,
  })
  bio: string;

  @Column({
    name: 'dark_mode',
    unique: false,
    nullable: false,
    default: false,
  })
  darkMode: boolean;

  @Column({
    name: 'email_verification_token',
    type: 'varchar',
    nullable: false,
    unique: true,
    generated: 'uuid',
  })
  emailVerificationToken: string;

  @Column({
    name: 'email_verified',
    type: 'boolean',
    default: false,
  })
  emailVerified: boolean;

  @Column({
    name: 'refresh_token_step',
    unique: false,
    nullable: false,
    default: 0,
  })
  refreshTokenStep: number;

  @Column({
    name: 'password_reset_token',
    unique: true,
    nullable: true,
    default: null,
  })
  passwordResetToken: string;

  @Column({ name: 'firstname', unique: false, length: 40, nullable: false })
  firstname: string;

  @Column({ name: 'lastname', unique: false, length: 40, nullable: false })
  lastname: string;

  @Column({ name: 'email', unique: true, length: 40, nullable: false })
  email: string;

  @Column({
    name: 'password',
    unique: false,
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'date_created',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: Date;

  @Column({
    name: 'last_active',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastActive: Date;

  @UpdateDateColumn({
    name: 'date_updated',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdated: Date;

  @BeforeInsert()
  private beforeInsert = async () => {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(this.password, salt);
    this.password = hash;
  };

  public validatePassword = async (
    enteredPassword: string,
  ): Promise<boolean> => {
    const match: boolean = await bcrypt.compare(enteredPassword, this.password);
    if (match) return true;
    else return false;
  };
}
