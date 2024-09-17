import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesService } from '../../services/properties.service';
import { PropertyDialogComponent } from '../property-dialog/property-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  imports: [
    MatToolbarModule, 
    MatIconModule,
    MatTooltipModule, // Import MatToolbarModule for mat-toolbar
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule, // Add MatFormFieldModule here
    MatInputModule, 
    CommonModule,HttpClientModule ],
    
     
})
export class PropertyListComponent implements OnInit, AfterViewInit {
  properties: Record<string, string> = {};
  dataSource=new MatTableDataSource<any>([])
  displayedColumns: string[] = ['key', 'value', 'actions']; 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

 
  constructor(
    private propertiesService: PropertiesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    console.log("this is the data")
    this.propertiesService.getAllProperties().subscribe((data) => {
      
      this.properties = data;
      // Convert the properties object into an array of key-value pairs for MatTableDataSource
      const formattedData = Object.entries(this.properties).map(([key, value]) => ({ key, value }));

      // Assign formatted data to MatTableDataSource and set the paginator
      this.dataSource.data = formattedData;
  
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PropertyDialogComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      if (result) {
        this.propertiesService.addProperty(result.key, result.value).subscribe(
          () => {
            this.loadProperties();
            this.snackBar.open('Property added', 'Close', { duration: 3000 });
          },
          (error) => this.snackBar.open(error, 'Close', { duration: 3000 })
        );
      }
    });
  }

  openEditDialog(key: string, value:string): void {
    console.log('key is '+ key)
    const dialogRef = this.dialog.open(PropertyDialogComponent, {
      data: { isEdit: true, key, value},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("this is result after update"+result.key + result.value)
      if (result) {
        this.propertiesService.updateProperty(key, result.value).subscribe(
          () => {
            this.loadProperties();
            this.snackBar.open('Property updated', 'Close', { duration: 3000 });
          },
          (error) => this.snackBar.open(error, 'Close', { duration: 3000 })
        );
      }
    });
  }

  
  deleteProperty(key: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('deletion response is received' + result)
      if (result) {
        console.log('deletion response is received' + key)
        // User confirmed the deletion, proceed with deletion
        this.propertiesService.deleteProperty(key).subscribe(
          () => {
            this.loadProperties();
            this.snackBar.open('Property deleted', 'Close', { duration: 3000 });
          },
          (error) => this.snackBar.open(error, 'Close', { duration: 3000 })
        );
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}