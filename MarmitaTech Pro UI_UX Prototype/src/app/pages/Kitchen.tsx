import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Clock, User, DollarSign, Package, Flame } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../components/ui/utils";

interface Order {
  id: string;
  number: string;
  customer: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: "new" | "preparing" | "ready" | "delivering" | "completed";
  time: string;
  duration: number;
}

const initialOrders: Order[] = [
  {
    id: "1",
    number: "#1234",
    customer: "Maria Santos",
    items: [
      { name: "Marmita Executiva", quantity: 2 },
      { name: "Suco Natural", quantity: 1 },
    ],
    total: 66.30,
    status: "new",
    time: "14:25",
    duration: 5,
  },
  {
    id: "2",
    number: "#1233",
    customer: "João Silva",
    items: [
      { name: "Marmita Fitness", quantity: 1 },
      { name: "Refrigerante", quantity: 1 },
    ],
    total: 31.90,
    status: "new",
    time: "14:18",
    duration: 12,
  },
  {
    id: "3",
    number: "#1232",
    customer: "Ana Paula",
    items: [
      { name: "Marmita Vegetariana", quantity: 2 },
      { name: "Brownie", quantity: 2 },
    ],
    total: 73.80,
    status: "preparing",
    time: "14:10",
    duration: 20,
  },
  {
    id: "4",
    number: "#1231",
    customer: "Carlos Lima",
    items: [
      { name: "Marmita Executiva", quantity: 1 },
    ],
    total: 28.90,
    status: "preparing",
    time: "14:05",
    duration: 25,
  },
  {
    id: "5",
    number: "#1230",
    customer: "Paula Costa",
    items: [
      { name: "Marmita Fitness", quantity: 3 },
      { name: "Suco Natural", quantity: 3 },
    ],
    total: 106.20,
    status: "ready",
    time: "13:55",
    duration: 35,
  },
  {
    id: "6",
    number: "#1229",
    customer: "Roberto Alves",
    items: [
      { name: "Marmita Executiva", quantity: 1 },
      { name: "Refrigerante", quantity: 1 },
      { name: "Pudim", quantity: 1 },
    ],
    total: 43.90,
    status: "delivering",
    time: "13:45",
    duration: 45,
  },
];

const columns = [
  { id: "new", label: "Novo Pedido", color: "bg-chart-4/10 text-chart-4" },
  { id: "preparing", label: "Em Preparo", color: "bg-accent/10 text-accent" },
  { id: "ready", label: "Pronto para Entrega", color: "bg-primary/10 text-primary" },
  { id: "delivering", label: "Em Rota", color: "bg-chart-5/10 text-chart-5" },
  { id: "completed", label: "Finalizado", color: "bg-success/10 text-success" },
];

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "order",
    item: { id: order.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getDurationColor = (duration: number) => {
    if (duration < 15) return "text-success";
    if (duration < 30) return "text-accent";
    return "text-destructive";
  };

  return (
    <motion.div
      ref={drag}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={cn(
        "cursor-move",
        isDragging && "rotate-2"
      )}
    >
      <Card className="rounded-2xl border-border/50 hover:border-primary/50 transition-all">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-bold text-lg">{order.number}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {order.time}
                <span className={cn("ml-2", getDurationColor(order.duration))}>
                  {order.duration} min
                </span>
              </div>
            </div>
            <Flame className="w-5 h-5 text-primary" />
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {order.customer.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{order.customer}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-medium">Itens:</div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="truncate flex-1">
                  {item.quantity}x {item.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Package className="w-3 h-3" />
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} itens
            </div>
            <div className="font-bold text-primary flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {order.total.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ColumnProps {
  column: typeof columns[0];
  orders: Order[];
  onDrop: (orderId: string, status: Order["status"]) => void;
}

function Column({ column, orders, onDrop }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "order",
    drop: (item: { id: string }) => {
      onDrop(item.id, column.id as Order["status"]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "flex-1 min-w-[300px] transition-all",
        isOver && "ring-2 ring-primary rounded-2xl"
      )}
    >
      <Card className="rounded-2xl h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{column.label}</CardTitle>
            <Badge className={column.color}>{orders.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          {orders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">Nenhum pedido</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function Kitchen() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleDrop = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Cozinha</h1>
            <p className="text-muted-foreground">
              Gerencie os pedidos em tempo real
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">
              Atualizar
            </Button>
            <Button className="rounded-xl">Novo Pedido</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((column) => {
            const count = getOrdersByStatus(column.id as Order["status"]).length;
            return (
              <Card key={column.id} className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    {column.label}
                  </div>
                  <div className="text-2xl font-bold">{count}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              orders={getOrdersByStatus(column.id as Order["status"])}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
