import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  ChefHat, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Pizza
} from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ShoppingBag, label: "Pedidos", path: "/dashboard/orders" },
  { icon: UtensilsCrossed, label: "Cardápio", path: "/dashboard/menu" },
  { icon: ChefHat, label: "Cozinha", path: "/dashboard/kitchen" },
  { icon: BarChart3, label: "Relatórios", path: "/dashboard/reports" },
  { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 280,
          x: 0 
        }}
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r border-border bg-card lg:relative",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Pizza className="h-6 w-6 text-white" />
              </div>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-lg font-semibold text-foreground">MarmitaTech</h1>
                  <p className="text-xs text-muted-foreground">Pro</p>
                </motion.div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                    "hover:bg-accent/10",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className={cn(
              "rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-4",
              collapsed && "p-2"
            )}>
              {!collapsed ? (
                <>
                  <p className="text-xs font-medium text-foreground">Plano Pro</p>
                  <p className="text-xs text-muted-foreground mt-1">Válido até 23/12/2026</p>
                </>
              ) : (
                <div className="h-8 w-8 rounded-lg bg-primary/20" />
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  );
}
