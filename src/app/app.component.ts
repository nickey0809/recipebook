import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PROJECT';
  loadFeature:string = 'recipe';

  navigate(eventString:string){
    this.loadFeature = eventString;
  }
}

