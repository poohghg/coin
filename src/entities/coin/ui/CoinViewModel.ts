import { Formatter } from '@/src/shared/lib/formatCurrency';

export class CoinViewModel {
  static formattedPrice(price: number): string {
    return Formatter.asKRWFormat(price);
  }
}
