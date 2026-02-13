import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Header } from './common-components/header/header';
import { Sider } from './common-components/sider/sider';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,Header,Sider],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DataEntry');
}
