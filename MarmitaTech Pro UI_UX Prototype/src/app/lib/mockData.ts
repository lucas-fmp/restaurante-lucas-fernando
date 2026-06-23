// Mock data for the MarmitaTech Pro system

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "marmitas" | "bebidas" | "sobremesas" | "extras";
  image: string;
  active: boolean;
}

export interface Order {
  id: string;
  number: string;
  customer: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: "new" | "preparing" | "ready" | "delivering" | "completed" | "cancelled";
  payment: "money" | "credit" | "debit" | "pix";
  time: string;
  date: string;
  duration?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR");
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
  if (hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `há ${minutes} min`;
  return "agora";
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const generateOrderNumber = (): string => {
  return `#${Math.floor(1000 + Math.random() * 9000)}`;
};

export const calculatePercentage = (value: number, total: number): number => {
  return Math.round((value / total) * 100);
};

export const getStatusColor = (
  status: Order["status"]
): "default" | "secondary" | "destructive" => {
  switch (status) {
    case "new":
      return "default";
    case "preparing":
    case "ready":
    case "delivering":
      return "secondary";
    case "completed":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

export const getStatusLabel = (status: Order["status"]): string => {
  const labels = {
    new: "Novo",
    preparing: "Em Preparo",
    ready: "Pronto",
    delivering: "Em Rota",
    completed: "Finalizado",
    cancelled: "Cancelado",
  };
  return labels[status] || status;
};

export const getCategoryIcon = (category: Product["category"]): string => {
  const icons = {
    marmitas: "🍱",
    bebidas: "🥤",
    sobremesas: "🍰",
    extras: "🍟",
  };
  return icons[category] || "📦";
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return re.test(phone);
};

export const validateCNPJ = (cnpj: string): boolean => {
  const re = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return re.test(cnpj);
};

export const maskPhone = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})/, "$1-$2")
    .slice(0, 15);
};

export const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};
