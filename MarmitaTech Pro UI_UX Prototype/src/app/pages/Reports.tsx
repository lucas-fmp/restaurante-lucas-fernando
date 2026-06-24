import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingBag,
  Download,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { motion } from "motion/react";

const monthlyRevenueData = [
  { month: "Jan", revenue: 12400, orders: 420 },
  { month: "Fev", revenue: 15800, orders: 510 },
  { month: "Mar", revenue: 18200, orders: 625 },
  { month: "Abr", revenue: 16900, orders: 580 },
  { month: "Mai", revenue: 21500, orders: 720 },
  { month: "Jun", revenue: 24800, orders: 850 },
];

const topProducts = [
  { name: "Marmita Executiva", sales: 450, revenue: 13005 },
  { name: "Marmita Fitness", sales: 380, revenue: 10222 },
  { name: "Marmita Vegetariana", sales: 285, revenue: 7096.5 },
  { name: "Suco Natural", sales: 520, revenue: 4420 },
  { name: "Brownie", sales: 180, revenue: 2160 },
];

const customerData = [
  { type: "Novos", value: 245, color: "#F97316" },
  { type: "Recorrentes", value: 680, color: "#F59E0B" },
  { type: "Inativos", value: 125, color: "#6b7280" },
];

const hourlyData = [
  { hour: "11h", orders: 15 },
  { hour: "12h", orders: 45 },
  { hour: "13h", orders: 62 },
  { hour: "14h", orders: 38 },
  { hour: "15h", orders: 25 },
  { hour: "18h", orders: 35 },
  { hour: "19h", orders: 55 },
  { hour: "20h", orders: 42 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
          <p className="text-muted-foreground">
            Análises e insights do seu negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px] h-10 rounded-xl">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="rounded-xl gap-2">
            <FileText className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  15.3%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
                <h3 className="text-3xl font-bold">R$ 24.800</h3>
                <p className="text-xs text-success">+R$ 3.300 vs mês anterior</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  18.1%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <h3 className="text-3xl font-bold">850</h3>
                <p className="text-xs text-success">+130 vs mês anterior</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowDown className="w-3 h-3" />
                  2.4%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <h3 className="text-3xl font-bold">R$ 29,18</h3>
                <p className="text-xs text-destructive">-R$ 0,72 vs mês anterior</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-chart-4" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  12.5%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Novos Clientes</p>
                <h3 className="text-3xl font-bold">245</h3>
                <p className="text-xs text-success">+27 vs mês anterior</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="revenue" className="rounded-lg">
            Receita
          </TabsTrigger>
          <TabsTrigger value="products" className="rounded-lg">
            Produtos
          </TabsTrigger>
          <TabsTrigger value="customers" className="rounded-lg">
            Clientes
          </TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg">
            Desempenho
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <Card className="rounded-2xl lg:col-span-5">
              <CardHeader>
                <CardTitle>Evolução da Receita</CardTitle>
                <CardDescription>Receita e pedidos nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F97316"
                      strokeWidth={3}
                      name="Receita (R$)"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Pedidos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl lg:col-span-2">
              <CardHeader>
                <CardTitle>Pedidos por Horário</CardTitle>
                <CardDescription>Hoje</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="orders" fill="#F97316" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>Top 5 produtos do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.sales} vendas
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">
                        R$ {product.revenue.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Distribuição de Clientes</CardTitle>
                <CardDescription>Por tipo de cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {customerData.map((item) => (
                    <div key={item.type} className="text-center">
                      <div
                        className="w-4 h-4 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="text-sm text-muted-foreground">{item.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Métricas de Clientes</CardTitle>
                <CardDescription>Estatísticas gerais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de Retenção</span>
                    <span className="font-medium">68.5%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: "68.5%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de Conversão</span>
                    <span className="font-medium">42.3%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "42.3%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Satisfação Média</span>
                    <span className="font-medium">4.7/5.0</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: "94%" }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pedidos por Cliente</span>
                    <span className="text-2xl font-bold">3.2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Valor Médio</span>
                    <span className="text-2xl font-bold text-primary">R$ 93,76</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Tempo Médio de Preparo
                </div>
                <div className="text-3xl font-bold mb-1">18 min</div>
                <div className="text-xs text-success">-2 min vs mês anterior</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Taxa de Entrega no Prazo
                </div>
                <div className="text-3xl font-bold mb-1">94.5%</div>
                <div className="text-xs text-success">+3.2% vs mês anterior</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Taxa de Cancelamento
                </div>
                <div className="text-3xl font-bold mb-1">2.1%</div>
                <div className="text-xs text-success">-0.8% vs mês anterior</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
