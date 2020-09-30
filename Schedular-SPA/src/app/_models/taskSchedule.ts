import { Note } from './note';
export interface TaskSchedule {
    id?: number;
    title: string;
    start: any;
    end: any;
    userCurrentAssigned?: number;
    userLastEditId?: number;
    notes: Note [];
    highPriority?: boolean;
    isComplete?: boolean;
}
