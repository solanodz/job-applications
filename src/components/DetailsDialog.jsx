import api from "@/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'
import { buttonVariants } from "./ui/button";

const DetailsDialog = async () => {

    const data = await api.jobs.list();


    return (
        <div>
            <Dialog>
                <DialogTrigger className={`${buttonVariants({ variant: 'secondary' })} text-xs `}>Ver detalles</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{data.empresa}</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default DetailsDialog
