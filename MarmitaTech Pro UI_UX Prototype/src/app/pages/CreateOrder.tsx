import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  MapPin,
  CreditCard,
  Tag,
  UtensilsCrossed,
  Coffee,
  IceCream,
  Salad,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Marmita Executiva",
    price: 28.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    name: "Marmita Fitness",
    price: 26.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    name: "Marmita Vegetariana",
    price: 24.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    name: "Suco Natural",
    price: 8.50,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzgyMjU1MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    name: "Refrigerante",
    price: 5.00,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzgyMjU1MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "6",
    name: "Brownie",
    price: 12.00,
    category: "sobremesas",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3ODIxNTQyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "7",
    name: "Pudim",
    price: 10.00,
    category: "sobremesas",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3ODIxNTQyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "8",
    name: "Batata Frita",
    price: 8.00,
    category: "extras",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function CreateOrder() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [discount, setDiscount] = useState(0);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} adicionado ao pedido`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const handleFinishOrder = () => {
    if (cart.length === 0) {
      toast.error("Adicione itens ao pedido");
      return;
    }
    toast.success("Pedido criado com sucesso!");
    navigate("/kitchen");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Novo Pedido</h1>
          <p className="text-muted-foreground">Sistema POS de vendas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-9 h-12 rounded-xl bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-xl grid grid-cols-5">
              <TabsTrigger value="all" className="rounded-lg">
                Todos
              </TabsTrigger>
              <TabsTrigger value="marmitas" className="rounded-lg">
                <UtensilsCrossed className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Marmitas</span>
              </TabsTrigger>
              <TabsTrigger value="bebidas" className="rounded-lg">
                <Coffee className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Bebidas</span>
              </TabsTrigger>
              <TabsTrigger value="sobremesas" className="rounded-lg">
                <IceCream className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Sobremesas</span>
              </TabsTrigger>
              <TabsTrigger value="extras" className="rounded-lg">
                <Salad className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Extras</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="rounded-2xl overflow-hidden border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <div className="text-lg font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <Card className="rounded-2xl sticky top-24">
            <CardHeader>
              <CardTitle>Carrinho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Carrinho vazio</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          R$ {item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 rounded-lg"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 rounded-lg"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-lg text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="customer" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Cliente
                  </Label>
                  <Input
                    id="customer"
                    placeholder="Nome do cliente"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Endereço de entrega
                  </Label>
                  <Input
                    id="address"
                    placeholder="Rua, número, bairro..."
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Forma de pagamento
                  </Label>
                  <select
                    id="payment"
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="money">Dinheiro</option>
                    <option value="credit">Cartão de Crédito</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coupon" className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Cupom de desconto
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="Código do cupom"
                      className="rounded-xl"
                    />
                    <Button variant="outline" className="rounded-xl">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Desconto ({discount}%)</span>
                    <span className="font-medium text-success">
                      -R$ {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full h-12 rounded-xl"
                  onClick={handleFinishOrder}
                >
                  Finalizar Pedido
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl"
                  onClick={() => setCart([])}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
