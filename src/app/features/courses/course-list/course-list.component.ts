import { 
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    OnInit 
} from '@angular/core';
import { onDeleteResponse } from '@shared/interfaces/services';
import { Course } from '@shared/interfaces/components';
import { UserStoreService } from '@app/user/services/user-store.service'
import { CoursesStoreService } from '@app/services/courses-store.service';
import { take } from 'rxjs';


@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    @Input() courses: Course[] = [];
    @Input() authors: string[] = [];
    @Input() editable = false;

    @Output() showCourse = new EventEmitter<string>();
    @Output() editCourse = new EventEmitter<any>();
    @Output() deleteCourse = new EventEmitter<string>();

    constructor(
        private UserStoreService: UserStoreService,
        private CourseStoreService: CoursesStoreService
    ) { }

    ngOnInit(): void {
        if (!this.editable) {
            this.editable = this.UserStoreService.isAdmin;
        }
    }

    onShow(id: string) {
        this.showCourse.emit(id);
    }

    onEdit(course: any) {
        this.editCourse.emit(course);
    }

    onDeleteCourse(id: string) {
        this.CourseStoreService.deleteCourse(id)
            .pipe(take(1))
            .subscribe({
            next: (res: onDeleteResponse) => {
                if (res.successful) {
                    this.deleteCourse.emit(id);
                }
            }
        })
    }
}