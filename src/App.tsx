import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from './lib/supabase';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

type FormData = {
  nome: string;
  loja: string;
  whatsapp: string;
  tempo_mentoria: string;
  plataformas: string;
  plataforma_principal: string;
  logistica_ml: string;
  faturamento: number;
  investimento_ads: number;
  tacos: number;
  unidades: number;
  ticket_medio: number;
  margem: number;
  tendencia: string;
  produto_campeao: string;
  custo_campeao: number;
  preco_campeao: number;
  modelo_estoque: string;
  situacao_estoque: string;
  novo_produto: string;
  nivel_ads: string;
  problema_ads: string;
  afiliados: string;
  obstaculos: string;
  tentativas: string;
  prioridade: string;
  meta_30d: number;
  meta_90d: number;
  expectativa_sessao: string;
  outros: string;
};

export default function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: FormData) => {
    setErrorMsg('');
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Configuração do Supabase ausente. Verifique as variáveis de ambiente.');
      }

      const { error } = await supabase
        .from('briefings')
        .insert([data]);

      if (error) throw error;
      
      setIsSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Erro ao enviar:', err);
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar o formulário. Tente novamente.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Briefing Enviado!</h2>
          <p className="text-neutral-600">
            Obrigado por preencher o formulário. Suas respostas foram registradas com sucesso e nossa equipe entrará em contato em breve.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full py-3 px-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
          >
            Enviar nova resposta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl">
            GPS Briefing
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Preencha o formulário abaixo para nos ajudar a entender melhor o seu negócio antes da nossa sessão.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-12">
            
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Seção 1: Informações Básicas */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">1. Informações Básicas</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    {...register('nome', { required: 'Nome é obrigatório' })}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="Seu nome"
                  />
                  {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nome da Loja/Empresa *</label>
                  <input
                    type="text"
                    {...register('loja', { required: 'Loja é obrigatória' })}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="Sua loja"
                  />
                  {errors.loja && <p className="mt-1 text-sm text-red-600">{errors.loja.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    {...register('whatsapp', { required: 'WhatsApp é obrigatório' })}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>}
                </div>
              </div>
            </section>

            {/* Seção 2: Sobre o Negócio */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">2. Sobre o Negócio</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Há quanto tempo você está na mentoria?</label>
                  <input
                    type="text"
                    {...register('tempo_mentoria')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="Ex: 3 meses, 1 ano..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Em quais plataformas você vende hoje?</label>
                  <input
                    type="text"
                    {...register('plataformas')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="Ex: Mercado Livre, Shopee, Amazon, Site Próprio..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Qual a sua plataforma principal?</label>
                    <input
                      type="text"
                      {...register('plataforma_principal')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Logística no Mercado Livre</label>
                    <select
                      {...register('logistica_ml')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="Fulfillment">Fulfillment (Full)</option>
                      <option value="Coleta">Coleta</option>
                      <option value="Agência">Agência / Correios</option>
                      <option value="Flex">Flex</option>
                      <option value="Não vendo no ML">Não vendo no ML</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 3: Números e Métricas */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">3. Números e Métricas (Últimos 30 dias)</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Faturamento Bruto (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('faturamento')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Investimento em Ads (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('investimento_ads')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">TACOS (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('tacos')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Unidades Vendidas</label>
                  <input
                    type="number"
                    {...register('unidades')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Ticket Médio (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('ticket_medio')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Margem de Lucro Líquida (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('margem')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Tendência de Vendas</label>
                  <select
                    {...register('tendencia')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Crescendo">Crescendo</option>
                    <option value="Estável">Estável</option>
                    <option value="Caindo">Caindo</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Seção 4: Produto Campeão e Estoque */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">4. Produto Campeão e Estoque</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Qual é o seu produto campeão de vendas?</label>
                  <input
                    type="text"
                    {...register('produto_campeao')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Custo do Produto (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('custo_campeao')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Preço de Venda (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('preco_campeao')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Modelo de Estoque</label>
                    <select
                      {...register('modelo_estoque')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="Próprio">Estoque Próprio</option>
                      <option value="Dropshipping">Dropshipping</option>
                      <option value="Crossdocking">Crossdocking</option>
                      <option value="Misto">Misto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Situação do Estoque</label>
                    <select
                      {...register('situacao_estoque')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="Saudável">Saudável (Gira bem)</option>
                      <option value="Parado">Muito estoque parado</option>
                      <option value="Faltando">Faltando mercadoria (Ruptura)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Você está testando algum produto novo agora?</label>
                  <textarea
                    {...register('novo_produto')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>
              </div>
            </section>

            {/* Seção 5: Tráfego e Vendas */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">5. Tráfego e Vendas</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Como você avalia seu nível em Ads?</label>
                  <select
                    {...register('nivel_ads')}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Iniciante">Iniciante (Não sei fazer ou faço o básico)</option>
                    <option value="Intermediário">Intermediário (Faço campanhas, mas não otimizo bem)</option>
                    <option value="Avançado">Avançado (Domino as métricas e otimizações)</option>
                    <option value="Terceirizado">Terceirizado (Tenho agência/gestor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Qual o seu maior problema com Ads hoje?</label>
                  <textarea
                    {...register('problema_ads')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Você trabalha com afiliados ou influenciadores?</label>
                  <textarea
                    {...register('afiliados')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>
              </div>
            </section>

            {/* Seção 6: Desafios e Metas */}
            <section className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-xl font-semibold text-neutral-900">6. Desafios e Metas</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Qual o maior obstáculo que te impede de crescer hoje?</label>
                  <textarea
                    {...register('obstaculos')}
                    rows={3}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">O que você já tentou fazer para resolver isso?</label>
                  <textarea
                    {...register('tentativas')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Qual a sua prioridade número 1 para os próximos 30 dias?</label>
                  <textarea
                    {...register('prioridade')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Meta de Faturamento (30 dias) - R$</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('meta_30d')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Meta de Faturamento (90 dias) - R$</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('meta_90d')}
                      className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Qual a sua expectativa para a nossa sessão?</label>
                  <textarea
                    {...register('expectativa_sessao')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Algo mais que gostaria de compartilhar?</label>
                  <textarea
                    {...register('outros')}
                    rows={2}
                    className="w-full rounded-xl border-neutral-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 p-3 border"
                  />
                </div>
              </div>
            </section>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center py-4 px-8 border border-transparent text-base font-medium rounded-xl text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Briefing
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
