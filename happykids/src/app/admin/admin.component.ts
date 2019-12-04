import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../file.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  uri = 'http://localhost:3000/upload-image';
  attachmentList:any = [];
  uploader:FileUploader = new FileUploader({url:this.uri});
  constructor(private _fileService:FileService) {
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
  }
   }
  ngOnInit() {
  }

}
