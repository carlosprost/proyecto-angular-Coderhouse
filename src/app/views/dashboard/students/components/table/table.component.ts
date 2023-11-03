import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'src/app/interfaces/data-table';
import { Student } from 'src/app/interfaces/students';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  columnTable: DataTable[] = [
    {
    label: 'Nombre Completo',
    def: 'fullName',
    key: 'fullName',
    dataType: 'string',
  },
  {
    label: 'Edad',
    def: 'age',
    key: 'age',
    dataType: 'string',
  },
  {
    label: 'Estado',
    def: 'status',
    key: 'status',
    dataType: 'boolean',
  },
  {
    label: 'Acciones',
    def: 'actions',
    key: 'actions',
  }];
  @Input() data!: Student[];

  columns!: string[];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setColumns()
    
  }
  setColumns() {
    this.columns = this.columnTable.map((column: any) => column.key);
  }

  studentDetail(id: number) {
    this.router.navigate(['dashboard', 'students', 'detail', id])
  }

}
