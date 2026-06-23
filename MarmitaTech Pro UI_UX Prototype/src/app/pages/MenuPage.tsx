import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Filter
} from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
  stock?: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Marmita de Frango Grelhado",
    description: "Frango grelhado com arroz integral, feijão preto e salada",
    price: 22.50,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1602881916963-5daf2d97c06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjBib3dsfGVufDF8fHx8MTc4MjI1NTAyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 35
  },
  {
    id: "2",
    name: "Marmita Executiva de Carne",
    description: "Carne bovina com arroz branco, farofa e legumes grelhados",
    price: 26.00,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1601356616077-695728ae17cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3RlYWslMjBtZWFsfGVufDF8fHx8MTc4MjI1NTAyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 28
  },
  {
    id: "3",
    name: "Marmita de Salmão",
    description: "Salmão grelhado com quinoa, brócolis e molho de ervas",
    price: 35.00,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBmaXNoJTIwZ291cm1ldHxlbnwxfHx8fDE3ODIyNTUwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 15
  },
  {
    id: "4",
    name: "Marmita Fitness",
    description: "Peito de frango, batata doce, ovo e salada verde",
    price: 24.00,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc4MjE0NzAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 42
  },
  {
    id: "5",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná ou Sprite - 350ml",
    price: 5.00,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmslMjBjYW58ZW58MXx8fHwxNzgyMjU1MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 120
  },
  {
    id: "6",
    name: "Brownie de Chocolate",
    description: "Brownie caseiro com chocolate belga e nozes",
    price: 12.00,
    category: "sobremesas",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3ODIxNDA1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
    stock: 25
  },
];

export function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = [
    { value: "all", label: "Todos" },
    { value: "marmitas", label: "Marmitas" },
    { value: "bebidas", label: "Bebidas" },
    { value: "sobremesas", label: "Sobremesas" },
    { value: "extras", label: "Extras" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cardápio</h1>
          <p className="text-muted-foreground mt-1">Gerencie os produtos do seu cardápio</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Plus className="h-4 w-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os dados do produto que deseja adicionar ao cardápio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" placeholder="Ex: Marmita de Frango" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marmitas">Marmitas</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="sobremesas">Sobremesas</SelectItem>
                      <SelectItem value="extras">Extras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva os ingredientes e características do produto"
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0,00" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input id="stock" type="number" placeholder="0" className="rounded-xl" />
                </div>
                <div className="flex items-center justify-between space-y-2">
                  <Label htmlFor="active" className="flex flex-col gap-2">
                    <span>Ativo</span>
                    <Switch id="active" defaultChecked />
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1 rounded-xl">
                Cancelar
              </Button>
              <Button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent">
                Adicionar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl pl-10"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-5 rounded-xl md:w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value} className="rounded-lg">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group overflow-hidden rounded-2xl border-border/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <Badge className={item.active ? "bg-success" : "bg-muted"}>
                    {item.active ? "Ativo" : "Inativo"}
                  </Badge>
                  {item.stock && item.stock < 20 && (
                    <Badge variant="destructive">Estoque baixo</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      R$ {item.price.toFixed(2)}
                    </p>
                    {item.stock && (
                      <p className="text-xs text-muted-foreground">
                        Estoque: {item.stock}
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
