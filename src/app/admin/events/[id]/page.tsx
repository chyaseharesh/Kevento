import PageTitle from '@/components/PageTitle'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EventEditForm from '../../components/EventEditForm'

const EditEvent = () => {
    return (
        <div className="flex flex-col gap-5  w-full p-4 border rounded-lg">
            <div className="flex justify-between">
                <PageTitle title="Edit Event" />
                <Link href={'/admin/events'} >
                    <div className="flex">

                        <ArrowLeft />
                        <span>Back</span>
                    </div>
                </Link>

            </div>
            <div className="bg-gray-50 rounded-lg">
            <EventEditForm/>
            </div>
        </div>)
}

export default EditEvent