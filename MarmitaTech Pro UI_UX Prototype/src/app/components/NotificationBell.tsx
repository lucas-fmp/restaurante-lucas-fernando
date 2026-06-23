import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Bell, ShoppingBag, Users, AlertCircle, CheckCircle2 } from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "customer" | "alert" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Novo Pedido",
    message: "Pedido #1234 recebido de Maria Santos",
    time: "há 2 min",
    read: false,
  },
  {
    id: "2",
    type: "alert",
    title: "Estoque Baixo",
    message: "Marmita Fitness está acabando",
    time: "há 15 min",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Pedido Entregue",
    message: "Pedido #1230 foi entregue com sucesso",
    time: "há 1h",
    read: true,
  },
];

const iconMap = {
  order: ShoppingBag,
  customer: Users,
  alert: AlertCircle,
  success: CheckCircle2,
};

const colorMap = {
  order: "text-primary",
  customer: "text-chart-4",
  alert: "text-accent",
  success: "text-success",
};

export function NotificationBell() {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} novas</Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-3 cursor-pointer ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.type === "order"
                      ? "bg-primary/10"
                      : notification.type === "alert"
                      ? "bg-accent/10"
                      : notification.type === "success"
                      ? "bg-success/10"
                      : "bg-chart-4/10"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${colorMap[notification.type]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">
                    {notification.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {notification.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {notification.time}
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                )}
              </DropdownMenuItem>
            );
          })}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center text-primary">
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
