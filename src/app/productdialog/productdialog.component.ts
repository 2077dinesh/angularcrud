
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit{
  freshnessList=["Brand New","Second Hand","Refurbished"];
  actionBtn: string="Save";
  productForm!:FormGroup;
  constructor(public formbuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any, private dialogRef:MatDialogRef<ProductdialogComponent>){}
  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      date:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
    });
    // console.log(this.editData);

    if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
    }
    
  }

  addProduct(){
    if(this.editData){
      this.updateProduct();
    }else{
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{
            alert("Error")
          }
        })
      }
    }
    
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        this.productForm.reset();
        this.dialogRef.close('update');
        
      },error:(err)=>{
        alert("error");
      }
    })
  }

  


  
}
