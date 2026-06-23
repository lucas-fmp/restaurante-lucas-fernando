import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Bell,
  Palette,
  Shield,
  CreditCard,
  Printer,
  Upload
} from "lucide-react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";

export function SettingsPage() {
  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-1">Gerencie as configurações do seu restaurante</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-5 rounded-xl">
          <TabsTrigger value="general" className="rounded-lg">Geral</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">Notificações</TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg">Aparência</TabsTrigger>
          <TabsTrigger value="billing" className="rounded-lg">Cobrança</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">Segurança</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle>Informações do Restaurante</CardTitle>
                <CardDescription>
                  Configure os dados básicos do seu estabelecimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl text-white">
                      RC
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label>Logo do Restaurante</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2 rounded-xl">
                        <Upload className="h-4 w-4" />
                        Fazer Upload
                      </Button>
                      <Button variant="ghost" className="rounded-xl text-destructive">
                        Remover
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG ou JPG até 2MB. Recomendado: 400x400px
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Nome do Restaurante
                    </Label>
                    <Input
                      id="restaurant-name"
                      defaultValue="Restaurante Central"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="contato@restaurantecentral.com"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="(11) 98765-4321"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      defaultValue="(11) 98765-4321"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço Completo
                  </Label>
                  <Textarea
                    id="address"
                    defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Restaurante</Label>
                  <Textarea
                    id="description"
                    defaultValue="Restaurante especializado em marmitas saudáveis e delivery rápido. Atendemos toda a região com qualidade e sabor."
                    className="min-h-24 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle>Horário de Funcionamento</CardTitle>
                <CardDescription>
                  Configure os horários de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { day: "Segunda-feira", open: "11:00", close: "22:00", active: true },
                  { day: "Terça-feira", open: "11:00", close: "22:00", active: true },
                  { day: "Quarta-feira", open: "11:00", close: "22:00", active: true },
                  { day: "Quinta-feira", open: "11:00", close: "22:00", active: true },
                  { day: "Sexta-feira", open: "11:00", close: "23:00", active: true },
                  { day: "Sábado", open: "11:00", close: "23:00", active: true },
                  { day: "Domingo", open: "11:00", close: "22:00", active: false },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Switch defaultChecked={schedule.active} />
                    <span className="w-32 text-sm font-medium">{schedule.day}</span>
                    <Input
                      type="time"
                      defaultValue={schedule.open}
                      className="w-32 rounded-xl"
                      disabled={!schedule.active}
                    />
                    <span className="text-muted-foreground">até</span>
                    <Input
                      type="time"
                      defaultValue={schedule.close}
                      className="w-32 rounded-xl"
                      disabled={!schedule.active}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-xl">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="rounded-xl bg-gradient-to-r from-primary to-accent">
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>
                  Configure quando e como você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: "Novos Pedidos", description: "Receba notificações quando um novo pedido chegar", checked: true },
                  { title: "Pedidos Prontos", description: "Alerta quando um pedido estiver pronto para entrega", checked: true },
                  { title: "Pedidos Entregues", description: "Confirmação quando um pedido for entregue", checked: true },
                  { title: "Estoque Baixo", description: "Aviso quando produtos estiverem com estoque baixo", checked: true },
                  { title: "Novos Clientes", description: "Notificação de novos clientes cadastrados", checked: false },
                  { title: "Relatórios Diários", description: "Resumo diário de vendas e desempenho", checked: true },
                  { title: "Atualizações do Sistema", description: "Novidades e melhorias da plataforma", checked: false },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between space-x-2 rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Switch defaultChecked={notification.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Personalização
                </CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modo Escuro</p>
                      <p className="text-sm text-muted-foreground">
                        Ative o tema escuro para reduzir o cansaço visual
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sidebar Compacta</p>
                      <p className="text-sm text-muted-foreground">
                        Menu lateral sempre recolhido por padrão
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Animações</p>
                      <p className="text-sm text-muted-foreground">
                        Ative animações e transições suaves
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Plano e Cobrança
                </CardTitle>
                <CardDescription>
                  Gerencie sua assinatura e formas de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Plano Pro</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Todos os recursos incluídos
                      </p>
                      <p className="text-3xl font-bold text-primary mt-4">
                        R$ 149,90<span className="text-base font-normal text-muted-foreground">/mês</span>
                      </p>
                    </div>
                    <Button variant="outline" className="rounded-xl">
                      Mudar Plano
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    Próxima cobrança em 23 de Julho de 2026
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Forma de Pagamento</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expira em 12/2027</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="rounded-xl">
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Gerencie a segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <Button className="rounded-xl bg-gradient-to-r from-primary to-accent">
                    Alterar Senha
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Autenticação de Dois Fatores</p>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
