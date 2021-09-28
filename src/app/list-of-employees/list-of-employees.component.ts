import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { DataTablesModule } from 'angular-datatables';
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.css']
})
export class ListOfEmployeesComponent implements OnInit {
 
 // dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any>= new Subject();  
  employees: Observable<Employee[]> ;
  
  dataTable: any;
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  /**  this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    };**/
   
  }
  
  reloadData() {
    this.employees =this.employeeService.getEmployeesList();
  
    
    };
    


deleteEmployee(id: number) {
  this.employeeService.deleteEmployee(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
}
employeeDetails(id: number){
  this.router.navigate(['details', id]);
}
updateEmployee(id: number){
  this.router.navigate(['update', id]);
}
}