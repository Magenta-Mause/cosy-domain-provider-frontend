import {Outlet} from "@tanstack/react-router";
import Header from "@/components/layout/Header/Header.tsx";

export function AppShell() {
    return <div>
        <Header/>
        <Outlet/>
    </div>;
}
