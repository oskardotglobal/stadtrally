"use client";

import {useLoginCode} from "@/lib/hooks";
import Loading from "@/components/Loading";

export default function LogoutPage() {
    const logout = useLoginCode()[2]

    logout()

    return <Loading />
}
