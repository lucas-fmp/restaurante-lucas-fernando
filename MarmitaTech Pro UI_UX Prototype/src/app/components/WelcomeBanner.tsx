import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import { motion } from "motion/react";

export function WelcomeBanner() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bom dia"
      : currentHour < 18
      ? "Boa tarde"
      : "Boa noite";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="rounded-2xl border-border/50 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {greeting}, João!
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Seu negócio está crescendo! 🚀
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Você teve um aumento de <span className="text-success font-bold">+18%</span> nos pedidos
                e <span className="text-success font-bold">+15%</span> na receita este mês. Continue assim!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Meta Mensal</div>
                  <div className="font-bold">92%</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Satisfação</div>
                  <div className="font-bold">4.7★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
