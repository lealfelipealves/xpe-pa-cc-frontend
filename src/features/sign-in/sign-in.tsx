import { InputTextField } from "@/components/input-text-field";
import { createCustomer } from "@/http/create-customer";
import { RoutePaths } from "@/routes";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // corrigido para react-router-dom
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  cpf: z.string(),
});

type FormData = z.infer<typeof schema>;

export function Signin({ className }: { className?: string }) {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { cpf: "" },
  });

  const onSubmit = async (data: FormData) => {
    const [error, result] = await createCustomer(data);
    if (error) {
      console.error("Error creating customer:", error);
      toast.error("Erro ao criar cliente. Verifique o CPF e tente novamente.");
      return;
    }

    if (result.dataBackend && result.dataCongnito) {
      const { customer } = result.dataBackend;
      document.cookie = `customer=${JSON.stringify(customer)}; path=/; max-age=3600`;
      toast.success("Cliente criado com sucesso!");
      navigate(RoutePaths.dashboard);
    }
  };

  return (
    <div className={cn("w-full bg-yellow-50 flex items-center justify-center min-h-screen p-6", className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md flex flex-col gap-6"
      >
        <div className="text-center flex flex-col items-center gap-5">
          <h1 className="text-5xl font-bold text-orange-600">🍟🍔🥤</h1>
          <h1 className="text-3xl font-bold text-orange-600"> Bem-vindo à Lanchonete</h1>
        </div>

        <InputTextField
          control={control}
          label="CPF"
          name="cpf"
          type="text"
          autoComplete="off"
        />

        <button type="submit" className={cn("bg-orange-500 hover:bg-orange-600 text-white", [
          'px-4 py-2',
          'relative inline-flex items-center justify-center',
          'font-medium',
          'rounded-lg border-2',
          'cursor-default transition-all duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'select-none active:scale-[0.98]',
        ])}>
          Entrar
        </button>
      </form>
    </div>
  );
}
