import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogincompComponent } from "./component/logincomp/logincomp.component";
import { NavbarComponent } from "./component/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment02';
}
