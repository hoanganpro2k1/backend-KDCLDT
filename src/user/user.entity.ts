import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  lastName: string;

  @Column()
  phone: number;

  @Column({ nullable: true, default: null })
  position: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createdAt',
  })
  create_at: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'updatedAt' })
  updated_at: Date;
}
