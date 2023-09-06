export enum ProCard {
  SeVersion308 = 308, // 初始的pro卡版本，支援TRX, ATOM, DOT
  SeVersion310 = 310, // 增加ETH簽章資料大小上限、修正DOT的交易問題。支援BSC
  SeVersion311 = 311, // 支援 CRO, ETC
  SeVersion312 = 312, // secure recovery sum 0 的問題
  SeVersion315 = 315, // eth data 可簽長度增加到 10K bytes
  SeVersion321 = 321, // 支援 ADA
  SeVersion323 = 323, // 修正卡片 321 無法更新問題
  SeVersion328 = 328, // 新增 accountDigest20
  SeVersion329 = 329, // 修改簽章方式，讓 signTypedData 同樣資料的簽出結果會一致，以支援 dydx 登入
  SeVersion330 = 330, // 支援 BTC RBF(Replace By Fee)
  SeVersion331 = 331, // 修改簽章方式，讓 signTypedData 同樣資料的簽出結果會一致，以支援 dydx 登入
}
