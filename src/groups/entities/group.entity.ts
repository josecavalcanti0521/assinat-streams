import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IGroup } from '../interfaces/IGroup';
import { GroupMember } from './group-member';

@Entity('groups')
export class Group implements IGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  pricePerPerson: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalValue: number;

  @OneToMany(() => GroupMember, (membership) => membership.group)
  memberships: GroupMember[];
}
