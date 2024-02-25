"use client";

import { DetailEvent } from "@/components/DetailEvent";
import { EditEvent } from "@/components/EditEvent";
import { Loader } from "@/components/Loader";
import { TopBar } from "@/components/TopBar";
import { getDetailEvent } from "@/lib/fetching";
import React, { useEffect, useState } from "react";

export default function EditViewEvent({ params }) {
  const { eventId } = params;
  const [dataDetailEvent, setDataDetailEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDetailEvent(eventId);
        setDataDetailEvent(data.events);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching detail event:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-50">
        <TopBar />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
      {!isLoading && dataDetailEvent && <EditEvent event={dataDetailEvent} />}
    </div>
  );
}
