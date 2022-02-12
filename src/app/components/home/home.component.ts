import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  orders: Order[];
  loader: boolean;


  constructor(private readonly httpService: HttpService,
    private router: Router) { }

  ngOnInit(): void {
    this.loader = true;
    this.httpService.getService('api/v2/orders').subscribe((result: any) => {
      this.orders = result.orders;
      localStorage.setItem('orders', JSON.stringify(this.orders));
      this.loader = false;
    });
  }

  goToDetail = (item: Order) => {
    this.router.navigate(['/order', item.id]);
  }

}
