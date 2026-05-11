export default function Help() {
  return (
    <div className="container mx-auto px-4 py-20 mt-16 max-w-3xl">
      <h1 className="text-2xl font-bold uppercase tracking-[0.2em] mb-16 text-center">
        How Can We Help?
      </h1>
      
      <div className="space-y-10 text-left">
        {/*kargo Süreleri*/}
        <div className="border-b border-gray-50 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">
            Shipping Times
          </h2>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest">
            Standard delivery takes 3-5 business days.
          </p>
        </div>

        {/*Ödeme Yöntemleri*/}
        <div className="border-b border-gray-50 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">
            Payment Methods
          </h2>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed">
            Currently, we only accept Cash on Delivery (COD) payments. 
            <br className="mb-2" />
            Please note that a $10.00 COD service fee applies to all orders.
          </p>
        </div>

        {/*Beden*/}
        <div className="border-b border-gray-50 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">
            Sizing Guide
          </h2>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest">
            Detailed size charts are available on each product page.
          </p>
        </div>
      </div>

    </div>
  );
}