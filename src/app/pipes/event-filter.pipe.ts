import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(value: Event[], isOnline:boolean | null): Event[] {
    let eventList;
    eventList = value;
    if(isOnline != null){
      eventList = eventList.filter(x=>x.isOnline == isOnline);
    }
    return eventList;
  }

}
