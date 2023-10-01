import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from 'src/app/interfaces/data-table';
import { Student } from 'src/app/interfaces/students';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columnTable!: DataTable[];
  @Input() data!: Student[];

  columns!: String[];
  ngOnInit(): void {
    this.setColumns()
    
  }

  setColumns() {
    this.columns = this.columnTable.map((column: any) => column.key);
  }

}
