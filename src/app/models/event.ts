export interface Event {
  eventId:number;
  eventOwner:number;
  eventName:string;
  eventDescription:string;
  date:Date;
  endDate?:Date;
  isPrivate:boolean;
  isOnline:boolean;
  eventAddress:string;
}
