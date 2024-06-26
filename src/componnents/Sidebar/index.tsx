import { Logo } from "@/componnents/Sidebar/logo";
import { MainNavigation } from "./MainNavigation";

export function Sidebar() {
    return (
        <aside className='bg-metaverso-white rounded-3xl px-5 py-8 shadow-xl'>
        <Logo />
        <MainNavigation />
        </aside>
    )
}
