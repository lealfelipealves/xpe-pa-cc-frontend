import { cn } from "@/utils";
import { useNavigate } from "react-router";

export function Success() {
  const navigate = useNavigate();
  const cookieOrderId = document.cookie.split('; ').find(row => row.startsWith('orderId='));
  const orderId = cookieOrderId ? cookieOrderId.split('=')[1] : '#';
  console.log("Order ID from cookie:", orderId);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-yellow-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center border border-orange-200">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Pedido Confirmado!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Seu pedido <strong className="text-orange-600 text-xl">#{orderId}</strong> foi criado com sucesso!
        </p>
        <p className="text-gray-600 mb-6">Aguarde enquanto preparamos com carinho seu pedido. 🍟🍔🥤</p>
        <button
          onClick={() => navigate("/")} type="button" className={cn("bg-orange-500 hover:bg-orange-600 text-white", [
            'px-4 py-2',
            'relative inline-flex items-center justify-center',
            'font-medium',
            'rounded-lg border-2',
            'cursor-default transition-all duration-200 ease-in-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'select-none active:scale-[0.98]',
          ])}>
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
