import Link from 'next/link';
import { navItemType } from "@/Types/navItemType";

export function NavItem({refItem, titleItem, iconItem: Icon} : navItemType){
    return(
        <Link href={`${refItem}`}  className="flex items-center gap-3 px-3 py-2 rounded-lg transition duration-300 hover:bg-metaverso-blue-ligth hover:text-metaverso-white">
                <Icon className="h-5 w-5"/>
                <span className="font-semibold capitalize">{titleItem}</span>
        </Link>
    )
}