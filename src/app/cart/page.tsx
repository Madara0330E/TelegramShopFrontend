import Link from "next/link";
export default function CartPage() {
  const cartItems = []; 

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="h-screen flex flex-col">
      <header className="flex p-4 gap-[27.474vw] items-center">
        <Link href="/" className="">
          <img src="img/Arrow.svg" alt="" className="w-[4.167vw] h-[3.646vw]" />
        </Link>
        <div className="flex items-center">
          <span className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
            Корзина
          </span>
          {cartItems.length > 0 && (
            <sup className="text-[#EFEDF6] text-[4.167vw] ml-[1.042vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              {cartItems.length}
            </sup>
          )}
        </div>
      </header>

      {cartItems.length > 0 ? (
        <main className="flex-grow">
       
        </main>
      ) : (
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center w-[66.667vw]">
            <p className="text-[#EFEDF6] text-[4.167vw] font-inter-tight font-semibold leading-normal">Тут пусто и грустно</p>
            <p className="text-[#EFEDF6] opacity-50 text-[4.167vw] font-inter-tight font-medium leading-normal">Наполни корзину товарами из каталога</p>
          </div>
        </main>
      )}
    </div>
  );
}