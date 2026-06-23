import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Clock, 
  User, 
  MapPin, 
  DollarSign,
  ChefHat,
  Truck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  address: string;
  items: string[];
  total: number;
  time: string;
  waitTime: number;
  status: string;
}

const initialOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1234",
    customer: "Maria Silva",
    address: "Rua das Flores, 123 - Centro",
    items: ["2x Marmita de Frango", "1x Refrigerante"],
    total: 50.00,
    time: "14:30",
    waitTime: 5,
    status: "novo"
  },
  {
    id: "2",
    orderNumber: "#1235",
    customer: "João Santos",
    address: "Av. Principal, 456 - Jardim",
    items: ["1x Marmita de Carne", "1x Brownie"],
    total: 38.00,
    time: "14:35",
    waitTime: 8,
    status: "novo"
  },
  {
    id: "3",
    orderNumber: "#1236",
    customer: "Ana Costa",
    address: "Rua do Comércio, 789",
    items: ["3x Marmita Fitness"],
    total: 72.00,
    time: "14:25",
    waitTime: 12,
    status: "preparo"
  },
  {
    id: "4",
    orderNumber: "#1237",
    customer: "Pedro Lima",
    address: "Praça Central, 101",
    items: ["2x Marmita Executiva", "2x Refrigerante"],
    total: 62.00,
    time: "14:20",
    waitTime: 15,
    status: "preparo"
  },
  {
    id: "5",
    orderNumber: "#1238",
    customer: "Carla Souza",
    address: "Rua Nova, 222",
    items: ["1x Marmita de Salmão", "1x Sobremesa"],
    total: 47.00,
    time: "14:15",
    waitTime: 20,
    status: "pronto"
  },
  {
    id: "6",
    orderNumber: "#1239",
    customer: "Lucas Oliveira",
    address: "Av. Brasil, 333",
    items: ["2x Marmita de Frango"],
    total: 45.00,
    time: "14:10",
    waitTime: 25,
    status: "rota"
  },
  {
    id: "7",
    orderNumber: "#1240",
    customer: "Fernanda Costa",
    address: "Rua São João, 444",
    items: ["1x Marmita Fitness", "1x Refrigerante"],
    total: 29.00,
    time: "14:05",
    waitTime: 30,
    status: "rota"
  },
  {
    id: "8",
    orderNumber: "#1241",
    customer: "Roberto Silva",
    address: "Av. Paulista, 555",
    items: ["3x Marmita de Carne", "3x Refrigerante"],
    total: 93.00,
    time: "14:00",
    waitTime: 35,
    status: "finalizado"
  },
];

const columns = [
  { id: "novo", title: "Novo Pedido", icon: AlertCircle, color: "text-primary" },
  { id: "preparo", title: "Em Preparo", icon: ChefHat, color: "text-warning" },
  { id: "pronto", title: "Pronto para Entrega", icon: CheckCircle2, color: "text-success" },
  { id: "rota", title: "Em Rota", icon: Truck, color: "text-accent" },
  { id: "finalizado", title: "Finalizado", icon: CheckCircle2, color: "text-muted-foreground" },
];

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "order",
    item: order,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getWaitTimeColor = (time: number) => {
    if (time < 10) return "text-success";
    if (time < 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-move"
    >
      <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">{order.orderNumber}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <User className="h-3 w-3" />
                {order.customer}
              </p>
            </div>
            <Badge className={`${getWaitTimeColor(order.waitTime)} bg-transparent border`}>
              <Clock className="mr-1 h-3 w-3" />
              {order.waitTime}min
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="line-clamp-2">{order.address}</p>
            </div>

            <div className="space-y-1">
              {order.items.map((item, index) => (
                <p key={index} className="text-xs text-muted-foreground">• {item}</p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">{order.time}</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                R$ {order.total.toFixed(2)}
              </span>
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
  onDrop: (orderId: string, newStatus: string) => void;
}

function Column({ column, orders, onDrop }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "order",
    drop: (item: Order) => onDrop(item.id, column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[calc(100vh-300px)] rounded-2xl border-2 border-dashed transition-all ${
        isOver ? "border-primary bg-primary/5" : "border-border bg-muted/20"
      }`}
    >
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm rounded-t-2xl border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <column.icon className={`h-5 w-5 ${column.color}`} />
            <h3 className="font-semibold">{column.title}</h3>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {orders.length}
          </Badge>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <column.icon className={`h-12 w-12 ${column.color} opacity-20 mb-2`} />
            <p className="text-sm text-muted-foreground">Nenhum pedido</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function KitchenPage() {
  const [orders, setOrders] = useState(initialOrders);

  const handleDrop = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    const statusMessages: Record<string, string> = {
      novo: "Pedido movido para Novo",
      preparo: "Pedido iniciado na cozinha",
      pronto: "Pedido está pronto para entrega",
      rota: "Pedido saiu para entrega",
      finalizado: "Pedido finalizado com sucesso",
    };
    
    toast.success(statusMessages[newStatus] || "Status atualizado");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel da Cozinha</h1>
            <p className="text-muted-foreground mt-1">Gerencie o fluxo de produção em tempo real</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">
              <Clock className="mr-2 h-4 w-4" />
              Tempo Médio: 18min
            </Button>
            <Button variant="outline" className="rounded-xl">
              <ChefHat className="mr-2 h-4 w-4" />
              {orders.filter(o => o.status === "preparo").length} em produção
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid gap-4 lg:grid-cols-5">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              orders={orders.filter((order) => order.status === column.id)}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
