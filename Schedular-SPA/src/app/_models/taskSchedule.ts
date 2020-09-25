import { Note } from './note';
export interface TaskSchedule {
    id?: number;
    title: string;
    start: any;
    end: any;
    userId?: number;
    notes: Note [];
}
