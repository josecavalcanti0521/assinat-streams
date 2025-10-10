import { GroupMember } from '../../groups/entities/group-member';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  groupMemberships: GroupMember[];
}
