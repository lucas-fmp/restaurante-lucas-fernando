import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ShoppingBag, UtensilsCrossed, FileText, Settings } from "lucide-react";

const quickActions = [
  {
    icon: Plus,
    label: "Novo Pedido",
    description: "Criar pedido rápido",
    path: "/orders/new",
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    icon: UtensilsCrossed,
    label: "Adicionar Produto",
    description: "Novo item no cardápio",
    path: "/menu",
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    icon: ShoppingBag,
    label: "Ver Pedidos",
    description: "Lista de pedidos",
    path: "/orders",
    color: "bg-success/10 text-success hover:bg-success/20",
  },
  {
    icon: FileText,
    label: "Relatórios",
    description: "Análises e insights",
    path: "/reports",
    color: "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
  },
];

export function QuickActions() {
  return (
    <Card className="rounded-2xl border-border/50">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} to={action.path}>
                <Button
                  variant="ghost"
                  className={`w-full h-auto flex-col gap-2 p-4 rounded-xl ${action.color} transition-all`}
                >
                  <Icon className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
