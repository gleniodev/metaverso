import { BarChart3, CircleDollarSign, HandCoins, Bitcoin } from "lucide-react";
import { NavItem } from "./navItem";

export function MainNavigation() {
  return (
    <nav className="mt-10 space-y-0.5 text-sky-950">
      <NavItem refItem="dashboard" titleItem="dashboard" iconItem={BarChart3} />
      <NavItem
        refItem="investidores"
        titleItem="investidores"
        iconItem={HandCoins}
      />
      <NavItem
        refItem="investimentos"
        titleItem="investimentos"
        iconItem={CircleDollarSign}
      />
      {/* <NavItem refItem="ativos" titleItem="ativos" iconItem={Bitcoin} /> */}
    </nav>
  );
}
