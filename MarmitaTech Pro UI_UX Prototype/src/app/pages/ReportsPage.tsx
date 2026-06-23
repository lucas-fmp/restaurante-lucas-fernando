import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign
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
  Legend,
  Area,
  AreaChart
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const monthlyRevenue = [
  { month: "Jan", revenue: 45000, orders: 320, customers: 180 },
  { month: "Fev", revenue: 52000, orders: 380, customers: 210 },
  { month: "Mar", revenue: 48000, orders: 350, customers: 195 },
  { month: "Abr", revenue: 61000, orders: 420, customers: 245 },
  { month: "Mai", revenue: 58000, orders: 410, customers: 230 },
  { month: "Jun", revenue: 72000, orders: 480, customers: 290 },
];

const topProducts = [
  { name: "Marmita de Frango", sales: 450, revenue: 10125, growth: 12 },
  { name: "Marmita Executiva", sales: 380, revenue: 9880, growth: 8 },
  { name: "Marmita Fitness", sales: 320, revenue: 7680, growth: 15 },
  { name: "Marmita de Salmão", sales: 180, revenue: 6300, growth: -3 },
  { name: "Bebidas", sales: 520, revenue: 2600, growth: 5 },
];

const customerSegments = [
  { name: "Clientes Novos", value: 35, color: "#F97316" },
  { name: "Recorrentes", value: 45, color: "#F59E0B" },
  { name: "VIP", value: 20, color: "#10B981" },
];

const hourlyOrders = [
  { hour: "8h", orders: 12 },
  { hour: "9h", orders: 18 },
  { hour: "10h", orders: 25 },
  { hour: "11h", orders: 42 },
  { hour: "12h", orders: 65 },
  { hour: "13h", orders: 58 },
  { hour: "14h", orders: 48 },
  { hour: "15h", orders: 32 },
  { hour: "16h", orders: 28 },
  { hour: "17h", orders: 35 },
  { hour: "18h", orders: 52 },
  { hour: "19h", orders: 48 },
  { hour: "20h", orders: 38 },
  { hour: "21h", orders: 22 },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground mt-1">Análise detalhada do desempenho do seu negócio</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px] rounded-xl">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Receita Total (Mês)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 72.000,00</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +24% vs mês anterior
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Pedidos
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">480</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +17% vs mês anterior
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ticket Médio
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 150,00</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +6% vs mês anterior
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clientes Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">290</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +18% vs mês anterior
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Tendência de Receita (6 meses)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#F97316" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Segmentação de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
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

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Hourly Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-4"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Pedidos por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="hour" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="orders" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{product.name}</span>
                        <Badge 
                          className={`text-xs ${
                            product.growth >= 0 
                              ? "bg-success/10 text-success border-success/20" 
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}
                        >
                          {product.growth >= 0 ? "+" : ""}{product.growth}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          R$ {product.revenue.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales} vendas
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                        style={{ width: `${(product.sales / 520) * 100}%` }}
                      />
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
