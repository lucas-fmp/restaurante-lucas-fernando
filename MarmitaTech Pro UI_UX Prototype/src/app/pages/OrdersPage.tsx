import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { 
  Search, 
  Plus, 
  Eye, 
  MoreVertical,
  Filter,
  Download,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
  time: string;
}

const orders: Order[] = [
  { id: "1", orderNumber: "#1234", customer: "Maria Silva", items: 3, total: 50.00, status: "Em Preparo", paymentMethod: "Cartão", date: "2026-06-23", time: "14:30" },
  { id: "2", orderNumber: "#1235", customer: "João Santos", items: 2, total: 38.00, status: "Pronto", paymentMethod: "PIX", date: "2026-06-23", time: "14:35" },
  { id: "3", orderNumber: "#1236", customer: "Ana Costa", items: 3, total: 72.00, status: "Em Rota", paymentMethod: "Dinheiro", date: "2026-06-23", time: "14:25" },
  { id: "4", orderNumber: "#1237", customer: "Pedro Lima", items: 4, total: 62.00, status: "Novo", paymentMethod: "Cartão", date: "2026-06-23", time: "14:40" },
  { id: "5", orderNumber: "#1238", customer: "Carla Souza", items: 2, total: 47.00, status: "Em Preparo", paymentMethod: "PIX", date: "2026-06-23", time: "14:15" },
  { id: "6", orderNumber: "#1239", customer: "Lucas Oliveira", items: 2, total: 45.00, status: "Entregue", paymentMethod: "Cartão", date: "2026-06-23", time: "14:10" },
  { id: "7", orderNumber: "#1240", customer: "Fernanda Costa", items: 2, total: 29.00, status: "Entregue", paymentMethod: "Dinheiro", date: "2026-06-23", time: "14:05" },
  { id: "8", orderNumber: "#1241", customer: "Roberto Silva", items: 6, total: 93.00, status: "Entregue", paymentMethod: "PIX", date: "2026-06-23", time: "14:00" },
];

export function OrdersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Novo": "bg-primary/10 text-primary border-primary/20",
      "Em Preparo": "bg-warning/10 text-warning border-warning/20",
      "Pronto": "bg-success/10 text-success border-success/20",
      "Em Rota": "bg-accent/10 text-accent border-accent/20",
      "Entregue": "bg-muted text-muted-foreground border-border",
    };
    return variants[status] || variants["Novo"];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os pedidos do seu restaurante</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button 
            className="gap-2 rounded-xl bg-gradient-to-r from-primary to-accent"
            onClick={() => navigate("/dashboard/orders/new")}
          >
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por número do pedido ou cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] rounded-xl">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Em Preparo">Em Preparo</SelectItem>
                  <SelectItem value="Pronto">Pronto</SelectItem>
                  <SelectItem value="Em Rota">Em Rota</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 rounded-xl">
                <Calendar className="h-4 w-4" />
                Hoje
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-2xl border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-border transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items} itens</TableCell>
                  <TableCell className="font-semibold text-primary">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={`border ${getStatusBadge(order.status)}`} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.time}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-xl"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Pedido {order.orderNumber}</DialogTitle>
                            <DialogDescription>
                              Informações completas do pedido
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Cliente</p>
                                  <p className="font-medium">{selectedOrder.customer}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  <Badge className={`border ${getStatusBadge(selectedOrder.status)}`}>
                                    {selectedOrder.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Data/Hora</p>
                                  <p className="font-medium">{selectedOrder.time}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Pagamento</p>
                                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Itens do Pedido</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between rounded-xl bg-muted/50 p-3">
                                    <span>2x Marmita de Frango</span>
                                    <span className="font-medium">R$ 45,00</span>
                                  </div>
                                  <div className="flex justify-between rounded-xl bg-muted/50 p-3">
                                    <span>1x Refrigerante</span>
                                    <span className="font-medium">R$ 5,00</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">R$ {selectedOrder.total.toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem>Imprimir</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
