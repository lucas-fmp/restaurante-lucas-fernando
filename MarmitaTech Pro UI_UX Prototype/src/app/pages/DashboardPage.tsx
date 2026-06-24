import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  ChefHat, 
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "motion/react";
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
  ResponsiveContainer,
  Legend
} from "recharts";

const revenueData = [
  { day: "Seg", value: 4200 },
  { day: "Ter", value: 3800 },
  { day: "Qua", value: 5100 },
  { day: "Qui", value: 4600 },
  { day: "Sex", value: 6200 },
  { day: "Sáb", value: 7500 },
  { day: "Dom", value: 8100 },
];

const categoryData = [
  { name: "Marmitas", value: 45, color: "#F97316" },
  { name: "Bebidas", value: 25, color: "#F59E0B" },
  { name: "Sobremesas", value: 20, color: "#10B981" },
  { name: "Extras", value: 10, color: "#3B82F6" },
];

const orderStatusData = [
  { status: "Novo", count: 12 },
  { status: "Em Preparo", count: 8 },
  { status: "Pronto", count: 5 },
  { status: "Em Rota", count: 15 },
  { status: "Entregue", count: 32 },
];

const recentOrders = [
  { id: "#1234", customer: "Maria Silva", items: "2x Marmita de Frango", value: 45.00, status: "Em Preparo", time: "5 min" },
  { id: "#1235", customer: "João Santos", items: "1x Marmita de Carne, 1x Refrigerante", value: 38.50, status: "Pronto", time: "12 min" },
  { id: "#1236", customer: "Ana Costa", items: "3x Marmita Fitness", value: 67.50, status: "Em Rota", time: "18 min" },
  { id: "#1237", customer: "Pedro Lima", items: "2x Marmita Executiva", value: 52.00, status: "Novo", time: "2 min" },
  { id: "#1238", customer: "Carla Souza", items: "1x Marmita de Peixe", value: 35.00, status: "Em Preparo", time: "8 min" },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pedidos Hoje
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72</div>
              <p className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                12% vs ontem
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Receita do Dia
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 3.248,50</div>
              <p className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                18% vs ontem
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ticket Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45,12</div>
              <p className="flex items-center text-xs text-destructive mt-1">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                3% vs ontem
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Produção
              </CardTitle>
              <ChefHat className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="mr-1 h-3 w-3" />
                Tempo médio: 18min
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Entregues
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52</div>
              <p className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                15% vs ontem
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Receita da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F97316" 
                    strokeWidth={3}
                    dot={{ fill: '#F97316', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Status and Recent Orders */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Order Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Status dos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="status" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#F97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4 transition-all hover:bg-muted/40"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.id}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${
                          order.status === "Novo" ? "bg-primary/10 text-primary" :
                          order.status === "Em Preparo" ? "bg-warning/10 text-warning" :
                          order.status === "Pronto" ? "bg-success/10 text-success" :
                          order.status === "Em Rota" ? "bg-accent/10 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">R$ {order.value.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">há {order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
