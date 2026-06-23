import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  UtensilsCrossed,
  Coffee,
  IceCream,
  Salad,
} from "lucide-react";
import { motion } from "motion/react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Marmita Executiva",
    description: "Arroz, feijão, bife acebolado, batata frita e salada",
    price: 28.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "2",
    name: "Marmita Fitness",
    description: "Arroz integral, frango grelhado, brócolis e cenoura",
    price: 26.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "3",
    name: "Marmita Vegetariana",
    description: "Arroz, feijão, legumes grelhados e tofu",
    price: 24.90,
    category: "marmitas",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "4",
    name: "Suco Natural Laranja",
    description: "Suco de laranja fresco 500ml",
    price: 8.50,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzgyMjU1MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "5",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná ou Sprite 350ml",
    price: 5.00,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzgyMjU1MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "6",
    name: "Brownie de Chocolate",
    description: "Brownie artesanal com nozes",
    price: 12.00,
    category: "sobremesas",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3ODIxNTQyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
  {
    id: "7",
    name: "Pudim de Leite",
    description: "Pudim caseiro tradicional",
    price: 10.00,
    category: "sobremesas",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3ODIxNTQyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    active: false,
  },
  {
    id: "8",
    name: "Batata Frita",
    description: "Porção individual de batata frita",
    price: 8.00,
    category: "extras",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc4MjI1NTAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    active: true,
  },
];

const categories = [
  { id: "all", label: "Todos", icon: UtensilsCrossed },
  { id: "marmitas", label: "Marmitas", icon: UtensilsCrossed },
  { id: "bebidas", label: "Bebidas", icon: Coffee },
  { id: "sobremesas", label: "Sobremesas", icon: IceCream },
  { id: "extras", label: "Extras", icon: Salad },
];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cardápio</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos do seu restaurante
          </p>
        </div>
        <Button onClick={handleAddNew} className="rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Item
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-9 h-12 rounded-xl bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="h-auto p-1 bg-muted/50 rounded-xl">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="rounded-lg gap-2 data-[state=active]:bg-background"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="rounded-2xl overflow-hidden border-border/50 hover:border-primary/50 transition-all group">
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.active && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="secondary">Indisponível</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                    <Switch checked={item.active} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Preço</div>
                    <div className="text-2xl font-bold text-primary">
                      R$ {item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-xl"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-xl text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar Item" : "Adicionar Novo Item"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do produto do cardápio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                placeholder="Ex: Marmita Executiva"
                defaultValue={editingItem?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva os ingredientes..."
                defaultValue={editingItem?.description}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={editingItem?.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={editingItem?.category || "marmitas"}
                >
                  <option value="marmitas">Marmitas</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="sobremesas">Sobremesas</option>
                  <option value="extras">Extras</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                placeholder="https://..."
                defaultValue={editingItem?.image}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingItem ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
