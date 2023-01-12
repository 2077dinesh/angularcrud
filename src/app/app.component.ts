import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ProductdialogComponent } from './productdialog/productdialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['productName', 'category','date','freshness', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog:MatDialog,public api:ApiService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  title = 'angularcrud';

  openDialog() {
    this.dialog.open(ProductdialogComponent,{
      width:"35%"
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }else{
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProducts().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("error")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(ProductdialogComponent,{
      width:"35%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(row:any){
    
    this.api.deleteProduct(row.id).subscribe({
      next:(res)=>{
        this.getAllProducts();
      },error:(err)=>{
        alert("error")
      }
    })
  }
}
