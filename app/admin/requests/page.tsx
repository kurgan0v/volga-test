"use client";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import { RangeValue } from 'rc-picker/lib/interface'
import RequestsList from "@/my_pages/Admin/RequestsList/RequestsList";
import {Dict} from "@/types/admin";

interface Request{
    id: string
    status: string
    name: string
    phone: string
    from: string
    comment: string
    createdAt: string
    statusInfo: {
        name: string
        value: string
        id: string
        type: string
    }
}
interface RequestsQuery{
    requests: Request[],
    totalCount: number
}
export default function Home() {
    const [page, setPage] = useState(1)
    const [dateRange, setDateRange] = useState<RangeValue<dayjs.Dayjs>>();
    const [pageSize, setPageSize] = useState(10);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const getRequests = (): Promise<RequestsQuery> => api.post(`/requests`, {
        page,
        pageSize,
        statuses: selectedStatuses.length ? selectedStatuses : undefined,
        start: dateRange ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined,
        end: dateRange ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined
    }, {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then((response) => response.data);
    const {data, isSuccess, refetch} = useQuery<RequestsQuery>(['requests', page, dateRange, pageSize, selectedStatuses], getRequests);

    const getStatuses = (): Promise<Dict[]> => api.get('/statuses', {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then((response) => response.data);
    const {data: statuses, isSuccess: statusesIsSuccess} = useQuery<Dict[]>(['statuses'], getStatuses);

    return (
        <>
            {data && <RequestsList
                data={data}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                dateRange={dateRange}
                setDateRange={setDateRange}
                statuses={statuses ?? []}
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
                refetch={refetch}
            />}
        </>
    )
}