import React from "react";
import AdminLayout from "@/my_pages/Admin/AdminLayout/AdminLayout";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    )
}
