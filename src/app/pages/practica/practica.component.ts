import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit,Inject} from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styles: [
  ]
})
export class PracticaComponent implements OnInit {

  public url: string;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(url) {
    this.url = url;
    const dialogRef = this.dialog.open(ImageDialog, {
      width: '65%',
      data: {url: this.url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.html',
})

export class ImageDialog {
  constructor(
    public dialogRef: MatDialogRef<ImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
