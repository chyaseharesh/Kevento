import PageTitle from '@/components/PageTitle'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EventForm from '../../components/EventAddForm'

const AddEvent = () => {
    return (
        <div className="flex flex-col gap-5  w-full p-4 border rounded-lg">
            <div className="flex justify-between">
                <PageTitle title="Add Event" />
                <Link href={'/admin/events'} >
                    <div className="flex">

                        <ArrowLeft />
                        <span>Back</span>
                    </div>
                </Link>

            </div>
            <div className="bg-gray-50 rounded-lg">
                <EventForm/>
            </div>
        </div>)
}

export default AddEvent