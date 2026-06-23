import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold">Página não encontrada</h1>
          <p className="text-muted-foreground">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Link to="/">
              <Button className="rounded-xl gap-2">
                <Home className="w-4 h-4" />
                Ir para Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          Se você acredita que isso é um erro, entre em contato com o suporte.
        </motion.div>
      </motion.div>
    </div>
  );
}
