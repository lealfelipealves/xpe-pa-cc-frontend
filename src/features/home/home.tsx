import { getProductsByCategory } from "@/http/get-products-by-category";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { RoutePaths } from "@/routes";
import { createOrder } from "@/http/create-order";

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
}

const categories = ["Lanche", "Bebida", "Sobremesa", "Acompanhamento"];

export function Home({ className }: { className?: string }) {
  const navigate = useNavigate();

  const customerCookie = document.cookie.split('; ').find(row => row.startsWith('customer='));
  console.log("Customer Cookie:", customerCookie);
  const customerId = customerCookie ? JSON.parse(customerCookie.split('=')[1]) : null;
  console.log("Customer ID:", customerId);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Lanche");
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function getProductsList() {
      const [error, result] = await getProductsByCategory(selectedCategory);
      if (error) {
        console.error("Error fetching products:", error);
        toast.error("Erro ao buscar produtos. Tente novamente.");
        return;
      }
      setProducts(result.products);
      console.log("Products fetched successfully:", result);
    }
    getProductsList();
  }, [selectedCategory]);

  function handleAddToCart(product: Product) {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} adicionado ao pedido!`);
  }

  async function handleSubmitOrder() {
    if (!customerId) {
      toast.error("Cliente não identificado.");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Adicione produtos ao pedido.");
      return;
    }

    const productIds = cart.map((p) => p.id);

    try {
      const [error, result] = await createOrder(customerId.id, productIds);

      if (error || !result) {
        toast.error("Erro ao enviar pedido.");
        return;
      }

      toast.success("Pedido enviado com sucesso!");
      setCart([]);
      document.cookie = `orderId=${result.order.id}; path=/; max-age=3600`; // 1 hour expiration
      // redireciona para tela de sucesso com o ID
      navigate(`${RoutePaths.success.replace(":id", result.order.id)}`);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível finalizar o pedido.");
    }
  }

  return (
    <div className={cn("relative flex flex-col gap-8 w-full min-h-screen p-8 bg-yellow-50", className)}>
      <h1 className="text-3xl font-bold text-orange-700 text-center">🍔 Faça seu Pedido!</h1>

      {/* Categorias */}
      <div className="flex gap-3 justify-center flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition-colors",
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-600 border border-orange-300 hover:bg-orange-100",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products
            .filter((p) => !selectedCategory || p.category === selectedCategory)
            .map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <h2 className="text-lg font-bold text-orange-700">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-base font-medium mt-2 text-green-600">
                  R$ {product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={cn("mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg", [
                    'px-4 py-2',
                    'relative inline-flex items-center justify-center',
                    'font-medium',
                    'rounded-lg border-2',
                    'cursor-default transition-all duration-200 ease-in-out',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'select-none active:scale-[0.98]',
                  ])}
                >
                  Adicionar ao Pedido
                </button>
              </div>
            ))
        ) : (
          <p className="text-lg text-center col-span-full">Nenhum produto disponível.</p>
        )}
      </div>

      {/* Carrinho flutuante */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white border border-orange-200 shadow-lg rounded-xl p-4 w-80 z-50">
          <h2 className="text-lg font-bold text-orange-600 mb-2">🛒 Seu Pedido</h2>
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {cart.map((item, index) => (
              <li key={index} className="text-sm flex justify-between">
                <span>{item.name}</span>
                <span className="text-green-700">R$ {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-orange-200 mt-2 pt-2 text-right font-semibold">
            Total: R$ {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
          <button type="button" className={cn("mt-2 w-full bg-green-600 hover:bg-green-700 text-white rounded-lg", [
            'px-4 py-2',
            'relative inline-flex items-center justify-center',
            'font-medium',
            'rounded-lg border-2',
            'cursor-default transition-all duration-200 ease-in-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'select-none active:scale-[0.98]',
          ])} onClick={handleSubmitOrder}>
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
