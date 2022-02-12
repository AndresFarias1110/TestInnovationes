import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { AlertComponent } from './../utils/alert/alert.component';
import { Item, Order } from '../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  items: Item[];
  order: Order;
  showForm: boolean;
  itemForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getItemOrder();
    this.initForm();
  }

  getItemOrder = () => {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros.id) {
        const orders: Order[] = JSON.parse(localStorage.getItem('orders'));
        this.order = orders.find((order: Order) => order.id === parametros.id);
        if (this.order) {
          this.items = this.order.items;
          console.log(this.items);
        }
      }
    });
  }

  initForm = () => {
    this.itemForm = new FormGroup({
      sku: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  addItem = () => {
    if (this.itemForm.valid) {
      this.items.push(this.itemForm.value);
      this.showForm = false;
    }
  }

  pay = () => {
    this.dialog.open(AlertComponent, {
      data: {
        title: '¡Pago exitoso!',
        msg: 'El pago se ha relizado exitosamente, gracias por su compra.',
      },
    });
  }

}
