import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


const sharedModules = [
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  DragDropModule,
  MatExpansionModule,
  MatInputModule,
  MatDialogModule,
];
/**
 * Module to include all angular material modules needed for this application
 *
 * @export
 */

@NgModule({
  imports: [sharedModules],
  exports: [sharedModules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomAngularMaterialModule { }
