import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart,
  CreditCard,
  Banknote,
  Ticket,
  User,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate } from "react-router";

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
  { id: "1", name: "Marmita de Frango", price: 22.50, category: "marmitas", image: "https://images.unsplash.com/photo-1602881916963-5daf2d97c06e?w=200" },
  { id: "2", name: "Marmita de Carne", price: 26.00, category: "marmitas", image: "https://images.unsplash.com/photo-1601356616077-695728ae17cb?w=200" },
  { id: "3", name: "Marmita de Salmão", price: 35.00, category: "marmitas", image: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=200" },
  { id: "4", name: "Marmita Fitness", price: 24.00, category: "marmitas", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200" },
  { id: "5", name: "Refrigerante", price: 5.00, category: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200" },
  { id: "6", name: "Brownie", price: 12.00, category: "sobremesas", image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200" },
];

export function NewOrderPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [discountCode, setDiscountCode] = useState("");

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.error("Item removido do carrinho");
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = discountCode === "PROMO10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    toast.success("Pedido criado com sucesso!");
    navigate("/dashboard/kitchen");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Novo Pedido</h1>
          <p className="text-muted-foreground mt-1">Sistema POS - Ponto de Venda</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/dashboard/orders")} className="rounded-xl">
          Voltar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Products Panel */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-6">
              <div className="mb-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl pl-10"
                  />
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-4 rounded-xl">
                    <TabsTrigger value="all" className="rounded-lg">Todos</TabsTrigger>
                    <TabsTrigger value="marmitas" className="rounded-lg">Marmitas</TabsTrigger>
                    <TabsTrigger value="bebidas" className="rounded-lg">Bebidas</TabsTrigger>
                    <TabsTrigger value="sobremesas" className="rounded-lg">Sobremesas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="cursor-pointer overflow-hidden rounded-xl border-border/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                      onClick={() => addToCart(product)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-lg font-bold text-primary mt-1">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart Panel */}
        <div className="space-y-4">
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrinho ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="max-h-64 space-y-3 overflow-y-auto">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Carrinho vazio
                      </p>
                    </motion.div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3"
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-primary">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-lg text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Cliente
                  </Label>
                  <Input
                    placeholder="Nome do cliente"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </Label>
                  <Input
                    placeholder="Rua, número, bairro"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Forma de Pagamento</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Cartão de Crédito
                      </div>
                    </SelectItem>
                    <SelectItem value="debit">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Cartão de Débito
                      </div>
                    </SelectItem>
                    <SelectItem value="cash">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Dinheiro
                      </div>
                    </SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Cupom de Desconto
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Código do cupom"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    className="rounded-xl"
                  />
                  <Button variant="outline" className="rounded-xl">
                    Aplicar
                  </Button>
                </div>
                {discount > 0 && (
                  <Badge className="bg-success">Desconto aplicado: R$ {discount.toFixed(2)}</Badge>
                )}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="text-success">- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full rounded-xl bg-gradient-to-r from-primary to-accent"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Finalizar Pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
