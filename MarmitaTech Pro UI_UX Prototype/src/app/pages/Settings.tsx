import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Building2,
  User,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Upload,
} from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu restaurante
        </p>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-6">
        <TabsList className="h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="restaurant" className="rounded-lg gap-2">
            <Building2 className="w-4 h-4" />
            Restaurante
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg gap-2">
            <CreditCard className="w-4 h-4" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg gap-2">
            <Palette className="w-4 h-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Informações do Restaurante</CardTitle>
              <CardDescription>
                Dados básicos do estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    MJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="rounded-xl gap-2">
                    <Upload className="w-4 h-4" />
                    Alterar Logo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recomendado: 512x512px, PNG ou JPG
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Nome do Restaurante</Label>
                  <Input
                    id="restaurantName"
                    defaultValue="Marmitaria do João"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    defaultValue="12.345.678/0001-90"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    defaultValue="(11) 98765-4321"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contato@marmitariadojoao.com.br"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea
                  id="address"
                  defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567"
                  className="rounded-xl"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Conte um pouco sobre seu restaurante..."
                  className="rounded-xl"
                  rows={4}
                />
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="rounded-xl">
                  Cancelar
                </Button>
                <Button className="rounded-xl">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>
                Configure os horários de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Segunda-feira",
                "Terça-feira",
                "Quarta-feira",
                "Quinta-feira",
                "Sexta-feira",
                "Sábado",
                "Domingo",
              ].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked={day !== "Domingo"} />
                    <span className="font-medium">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      defaultValue="11:00"
                      className="rounded-xl w-32"
                      disabled={day === "Domingo"}
                    />
                    <span className="text-muted-foreground">até</span>
                    <Input
                      type="time"
                      defaultValue="22:00"
                      className="rounded-xl w-32"
                      disabled={day === "Domingo"}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Seus dados de usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="rounded-xl gap-2">
                    <Upload className="w-4 h-4" />
                    Alterar Foto
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    defaultValue="João Silva"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    defaultValue="joao@email.com"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userPhone">Telefone</Label>
                  <Input
                    id="userPhone"
                    defaultValue="(11) 91234-5678"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    defaultValue="Proprietário"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="rounded-xl">
                  Cancelar
                </Button>
                <Button className="rounded-xl">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Altere sua senha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="rounded-xl"
                />
              </div>

              <div className="flex justify-end">
                <Button className="rounded-xl">Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novos Pedidos</div>
                    <div className="text-sm text-muted-foreground">
                      Receber notificação quando houver novos pedidos
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Pedidos Prontos</div>
                    <div className="text-sm text-muted-foreground">
                      Notificar quando pedidos estiverem prontos
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Relatórios Diários</div>
                    <div className="text-sm text-muted-foreground">
                      Receber resumo diário por email
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Alertas de Estoque</div>
                    <div className="text-sm text-muted-foreground">
                      Avisos quando produtos estiverem em falta
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Promoções e Novidades</div>
                    <div className="text-sm text-muted-foreground">
                      Receber dicas e atualizações do sistema
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Formas de Pagamento</CardTitle>
              <CardDescription>
                Configure os métodos de pagamento aceitos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="font-medium">Dinheiro</div>
                    <div className="text-sm text-muted-foreground">
                      Pagamento em espécie
                    </div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Cartão de Crédito</div>
                    <div className="text-sm text-muted-foreground">
                      Visa, Mastercard, Elo
                    </div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Cartão de Débito</div>
                    <div className="text-sm text-muted-foreground">
                      Visa, Mastercard, Elo
                    </div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chart-4/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-chart-4" />
                  </div>
                  <div>
                    <div className="font-medium">PIX</div>
                    <div className="text-sm text-muted-foreground">
                      Pagamento instantâneo
                    </div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Customize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Modo Escuro</div>
                    <div className="text-sm text-muted-foreground">
                      Ativar tema escuro automaticamente
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sidebar Compacta</div>
                    <div className="text-sm text-muted-foreground">
                      Manter menu lateral recolhido por padrão
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Animações</div>
                    <div className="text-sm text-muted-foreground">
                      Habilitar animações na interface
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
