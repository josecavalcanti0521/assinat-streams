import { GroupMember } from '../entities/group-member';

export interface IGroup {
  id: number;
  name: string;
  quantity: number;
  pricePerPerson: number;
  totalValue: number;
  memberships: GroupMember[];
}
