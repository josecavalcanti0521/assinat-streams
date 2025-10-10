import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { GroupMember } from '../../groups/entities/group-member';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => GroupMember, (membership) => membership.user)
  groupMemberships: GroupMember[];
}
