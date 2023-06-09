import { Component, OnInit } from '@angular/core';
import { convertor } from './services/convertor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public amount:number=1;
  public currfrom:any;
  public currto:any;
  public data:any;
  public valuefrom:any;
  public valueto:any;
  public result:any;
  public flagfrom:string ='ma'.toLowerCase();
  public flagto:string = 'us'.toLowerCase();
  
  public constructor(private convertor:convertor){}
  ngOnInit(): void {
   
   this.getcountryfrom()
   this.getcountryto()
  }
  getcountryfrom(){
    this.convertor.getCountries().subscribe(data=>
      this.currfrom = Object.entries(data).map((value) => value[0].toUpperCase())
      )
  }
  getcountryto(){
    this.convertor.getCountries().subscribe(data=>
      this.currto = Object.entries(data).map((value)=>value[0].toUpperCase())
      );
  }
  currencyconverter(from:any, to:any){
    this.convertor.convert(from, to).subscribe(data=>{
    this.data = Object.entries(data).map(x => x[1])  
    this.valuefrom = Object.entries(this.data[4]).map(x=>x[1])[0]
    this.valueto  = Object.entries(this.data[4]).map(x=>x[1])[1]
    this.result = (this.amount*(this.valueto/this.valuefrom))            
    // console.log(this.result);
    
  }); 

  }
  getflag(flag?:any,to?:any){
    this.flagfrom = flag.toString().slice(0, -1).toLowerCase();
    this.flagto = to.toString().slice(0, -1).toLowerCase();
    console.log(this.flagfrom);

  }
  
  title = 'converter';
}
