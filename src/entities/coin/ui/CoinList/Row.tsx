interface CoinListRowProps {
  // react Element List
}

const CoinListRow = () => {
  return (
    <li className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
      {/* 즐겨찾기} 버튼 *!/*/}
      <div className="col-span-1 flex items-center">
        <button onClick={e => toggleFavorite(market.market, e)} className="hover:scale-110 transition-transform">
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      </div>
      {/* 코인명 */}
      <div className="col-span-3 flex flex-col justify-center">
        <div className="font-medium text-gray-900">{market.korean_name}</div>
        <div className="text-xs text-gray-500">{market.english_name}</div>
      </div>
      {/* 현재가 */}
      <div className="col-span-2 text-right flex flex-col justify-center">
        <div className={`font-medium ${isPositive ? 'text-red-600' : 'text-blue-600'}`}>
          {formatPrice(ticker.trade_price)}
        </div>
      </div>
      {/* 전일대비 */}
      <div className="col-span-2 text-right flex flex-col justify-center">
        <div className={`flex items-center justify-end space-x-1 ${isPositive ? 'text-red-600' : 'text-blue-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">{(ticker.signed_change_rate * 100).toFixed(2)}%</span>
        </div>
        <div className={`text-xs ${isPositive ? 'text-red-500' : 'text-blue-500'}`}>
          {isPositive ? '+' : ''}
          {formatPrice(ticker.signed_change_price)}
        </div>
      </div>
      {/* 거래대금 */}
      <div className="col-span-4 text-right flex items-center justify-end">
        <div className="text-sm text-gray-700">{formatVolume(ticker.acc_trade_price_24h)}</div>
      </div>
    </li>
  );
};

export default CoinListRow;
