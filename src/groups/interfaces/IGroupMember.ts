import { User } from '../../users/entities/user.entity';
import { Group } from '../entities/group.entity';
import { MemberStatus } from '../enums/member-status.enum';

export interface IGroupMember {
  id: number;
  user: User;
  group: Group;
  status: MemberStatus;
  joinedAt: Date;
}
