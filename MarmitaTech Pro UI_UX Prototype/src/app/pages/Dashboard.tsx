import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { QuickActions } from "../components/QuickActions";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { motion } from "motion/react";
import { Link } from "react-router";

const revenueData = [
  { day: "Seg", value: 2400 },
  { day: "Ter", value: 1398 },
  { day: "Qua", value: 3800 },
  { day: "Qui", value: 3908 },
  { day: "Sex", value: 4800 },
  { day: "Sáb", value: 3800 },
  { day: "Dom", value: 4300 },
];

const categoryData = [
  { name: "Marmitas", value: 450, color: "#F97316" },
  { name: "Bebidas", value: 280, color: "#F59E0B" },
  { name: "Sobremesas", value: 150, color: "#10b981" },
  { name: "Extras", value: 120, color: "#3b82f6" },
];

const orderStatusData = [
  { status: "Novo", count: 12 },
  { status: "Preparo", count: 8 },
  { status: "Pronto", count: 5 },
  { status: "Entregue", count: 45 },
];

const recentOrders = [
  {
    id: "#1234",
    customer: "Maria Santos",
    items: 3,
    total: 89.90,
    status: "Em Preparo",
    time: "há 5 min",
  },
  {
    id: "#1233",
    customer: "João Silva",
    items: 2,
    total: 65.50,
    status: "Pronto",
    time: "há 12 min",
  },
  {
    id: "#1232",
    customer: "Ana Paula",
    items: 4,
    total: 125.00,
    status: "Em Rota",
    time: "há 18 min",
  },
  {
    id: "#1231",
    customer: "Carlos Lima",
    items: 1,
    total: 45.00,
    status: "Entregue",
    time: "há 25 min",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu restaurante em tempo real
          </p>
        </div>
        <Link to="/orders/new">
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  12%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pedidos Hoje</p>
                <h3 className="text-3xl font-bold">156</h3>
                <p className="text-xs text-muted-foreground">+18 desde ontem</p>
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
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  8%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Receita do Dia</p>
                <h3 className="text-3xl font-bold">R$ 4.580</h3>
                <p className="text-xs text-muted-foreground">Meta: R$ 5.000</p>
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
                  3%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <h3 className="text-3xl font-bold">R$ 29,35</h3>
                <p className="text-xs text-muted-foreground">-R$ 1,20 desde ontem</p>
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
                  <Clock className="w-6 h-6 text-chart-4" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUp className="w-3 h-3" />
                  5%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Em Produção</p>
                <h3 className="text-3xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground">Tempo médio: 18 min</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Receita da Semana</CardTitle>
              <CardDescription>Evolução diária das vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F97316"
                    strokeWidth={3}
                    dot={{ fill: "#F97316", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
              <CardDescription>Distribuição de produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
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
              <div className="grid grid-cols-2 gap-3 mt-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Últimas transações</CardDescription>
                </div>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {order.customer.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.id} • {order.items} itens • {order.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">
                          R$ {order.total.toFixed(2)}
                        </div>
                        <Badge
                          variant={
                            order.status === "Entregue"
                              ? "secondary"
                              : "default"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Status dos Pedidos</CardTitle>
              <CardDescription>Visão geral em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="status"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="#F97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}