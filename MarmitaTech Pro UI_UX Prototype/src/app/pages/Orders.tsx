import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Plus, Eye, Printer, Download, Filter } from "lucide-react";

const orders = [
  {
    id: "1234",
    customer: "Maria Santos",
    items: 3,
    total: 89.90,
    status: "preparing",
    payment: "credit",
    time: "14:25",
    date: "23/06/2026",
  },
  {
    id: "1233",
    customer: "João Silva",
    items: 2,
    total: 65.50,
    status: "ready",
    payment: "pix",
    time: "14:18",
    date: "23/06/2026",
  },
  {
    id: "1232",
    customer: "Ana Paula",
    items: 4,
    total: 125.00,
    status: "delivering",
    payment: "money",
    time: "14:10",
    date: "23/06/2026",
  },
  {
    id: "1231",
    customer: "Carlos Lima",
    items: 1,
    total: 45.00,
    status: "completed",
    payment: "debit",
    time: "13:55",
    date: "23/06/2026",
  },
  {
    id: "1230",
    customer: "Paula Costa",
    items: 5,
    total: 156.40,
    status: "completed",
    payment: "credit",
    time: "13:42",
    date: "23/06/2026",
  },
  {
    id: "1229",
    customer: "Roberto Alves",
    items: 2,
    total: 67.80,
    status: "cancelled",
    payment: "pix",
    time: "13:30",
    date: "23/06/2026",
  },
];

const statusConfig = {
  new: { label: "Novo", variant: "default" as const, color: "text-chart-4" },
  preparing: { label: "Em Preparo", variant: "secondary" as const, color: "text-accent" },
  ready: { label: "Pronto", variant: "secondary" as const, color: "text-primary" },
  delivering: { label: "Em Rota", variant: "secondary" as const, color: "text-chart-5" },
  completed: { label: "Finalizado", variant: "secondary" as const, color: "text-success" },
  cancelled: { label: "Cancelado", variant: "destructive" as const, color: "text-destructive" },
};

const paymentConfig = {
  money: "Dinheiro",
  credit: "Crédito",
  debit: "Débito",
  pix: "PIX",
};

export function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os pedidos do restaurante
          </p>
        </div>
        <Link to="/orders/new">
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou número do pedido..."
                className="pl-9 h-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[200px] h-10 rounded-xl">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="new">Novo</SelectItem>
                <SelectItem value="preparing">Em Preparo</SelectItem>
                <SelectItem value="ready">Pronto</SelectItem>
                <SelectItem value="delivering">Em Rota</SelectItem>
                <SelectItem value="completed">Finalizado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-xl">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {order.customer.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{order.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.items} itens</TableCell>
                    <TableCell className="font-bold text-primary">
                      R$ {order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {paymentConfig[order.payment as keyof typeof paymentConfig]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig[order.status as keyof typeof statusConfig].variant}
                        className={statusConfig[order.status as keyof typeof statusConfig].color}
                      >
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{order.date}</div>
                        <div className="text-muted-foreground">{order.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum pedido encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
