import { Attribute, Component } from '@angular/core';  

//import xml2js from 'xml2js';  
import * as xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Content } from '@angular/compiler/src/render3/r3_ast';
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  

        
  title = 'read-xml-angular8';  
  public xmlItems: any;  

  constructor(private _http: HttpClient) { this.loadXML(); }  
  loadXML() {  
    this._http.get('/assets/continu.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
     
      .subscribe((data) => {  
        this.parseXML(data)  
          .then((data) => {  
            this.xmlItems = data;  
            
          });  
      }); 
    
  }  
 
  parseXML(data: string) {  
    return new Promise(resolve => {  
      var k: string | number;  
   
         var arr=[] as any,
      
      
         
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true,
            mergeAttrs : true  
          });  
      parser.parseString(data, function (err, result) {  
        var obj = result.rss;  
        var channel = obj.channel;
        
        for (k in channel) {  
          var channel = channel[k];  
          var items = channel.item;
   
          arr.push({ 
            title: channel.title,  
            pubDate: channel.pubDate,  
            description: channel.description,  
            guid: channel.guid,  
            link: channel.media,  
           
          
          });  
        } 
     
        items.forEach(function (element: any) {
          arr.push({ 
            title: element.title,  
            pubDate: element.pubDate,  
            description: element.description,  
            guid: element.guid,isPermaLink:"true",  
            link: element.link[0],  
           }); 
        }); 
        console.log(items);
        resolve(arr);  
    
      });  


    });  
  }  
} 

function children(arg0: string, arg1: boolean) {
  throw new Error('Function not implemented.');
}
