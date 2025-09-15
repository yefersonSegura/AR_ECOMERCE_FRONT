import { Component, OnInit } from '@angular/core';
import { PromotionController } from '../../../../../services/src/public-api';
import { PromotionDto } from '../../../../../services/src/lib/Infrastructure/dto/promotion-dto';

@Component({
  selector: 'app-promotion',
  standalone: false,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit {
  promotions: PromotionDto[] = [];
  constructor(private controller: PromotionController) { }
  ngOnInit(): void {
    this.getPromotions();
  }
  async getPromotions() {
    const fechaActual = new Date();
    let result = await this.controller.getPromotions(fechaActual);
    if (result.error) {
      return;
    }
    this.promotions = result.body ?? [];

  }
}
